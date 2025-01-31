import { PrismaClient } from "@prisma/client";
import { type ProductProps } from "@/type";

const prisma = new PrismaClient();

export const getProducts = async (): Promise<ProductProps[]> => {
  const productsWithDiscounts = await prisma.product.findMany({
    include: {
      discount: true, // Include discount details
    },
  });

  // Get the current date and time in the desired format: "YYYY-MM-DD HH:MM"
  const currentDate = new Date();

  // Format the date in Iran's timezone (Asia/Tehran)
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Tehran",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const iranTime = formatter.format(currentDate);

  const parts = formatter.formatToParts(currentDate);
  const year = parts.find((part) => part.type === "year")?.value ?? "2023";
  const month = parts.find((part) => part.type === "month")?.value ?? "01";
  const day = parts.find((part) => part.type === "day")?.value ?? "01";
  const hour = parts.find((part) => part.type === "hour")?.value ?? "00";
  const minute = parts.find((part) => part.type === "minute")?.value ?? "00";

  const formattedDate = `${year}-${month}-${day} ${hour}:${minute}`;

  const formattedProducts = productsWithDiscounts.map(
    (product: ProductProps) => {
      let finalPrice = product.price;
      let isDiscountValid = false;

      if (product.discount) {
        // Check if the discount is within the valid time range
        const isWithinDateRange =
          (!product.discount.startDate ||
            product.discount.startDate <= new Date(formattedDate)) &&
          (!product.discount.endDate ||
            product.discount.endDate >= new Date(formattedDate));

        if (isWithinDateRange) {
          isDiscountValid = true;
          if (product.discount.percentage) {
            finalPrice =
              product.price * (1 - product.discount.percentage / 100);
          }
        }
      }

      return {
        ...product,
        originalPrice: product.price,
        discountedPrice: isDiscountValid ? finalPrice : product.price, // Apply discount only if valid
        isDiscountValid, // Boolean indicating if discount is active
      };
    }
  );

  return formattedProducts;
};

export async function getRelatedProducts(limit: number = 10, userId: number) {
  console.log(userId, "userId");

  // Get the last viewed product for the user
  const lastProduct = await prisma.seenProduct.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      viewedAt: "desc",
    },
  });

  console.log(lastProduct, "lastProduct");

  try {
    // If no product was found for this user, return an empty array or handle it
    if (!lastProduct) {
      return [];
    }

    // Get the last product details along with categories
    const product = await prisma.product.findUnique({
      where: { id: lastProduct.productId },
      include: { categories: true }, // Include categories for related product search
    });

    if (!product) {
      return null; // Or throw an error if the product doesn't exist
    }

    // Try to fetch related products based on the current product
    const relatedProducts = await prisma.product.findMany({
      where: {
        AND: [
          { id: { not: lastProduct.productId } }, // Exclude the current product
          {
            OR: [
              // 1. Products in the same categories
              {
                categories: {
                  some: {
                    id: { in: product.categories.map((cat) => cat.id) },
                  },
                },
              },
              // 2. Products with similar names (you might need more sophisticated logic here)
              {
                name: {
                  contains: product.name.split(" ")[0], // Example: Check if names share the first word
                  mode: "insensitive",
                },
              },
            ],
          },
        ],
      },
      include: { categories: true, discount: true }, // Include categories and discount info for related products
      take: limit, // Limit the number of related products
    });

    // If no related products are found, return the five most recent products
    if (relatedProducts.length === 0) {
      const fallbackProducts = await prisma.product.findMany({
        orderBy: {
          // Order by the most recently viewed products
          createdAt: "asc",
        },
        take: 3, // Fetch the last 5 products
      });
      return fallbackProducts;
    }

    return relatedProducts;
  } catch (error) {
    console.error("Error fetching related products:", error);
    throw error; // Re-throw the error for handling at a higher level
  }
}

export async function createSeenProduct({
  slug,
  userId,
}: {
  slug: string;
  userId: number;
}) {
  const product = await prisma.product.findUnique({
    where: {
      slug: slug,
    },
    select: {
      id: true,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  try {
    const seenProduct = await prisma.seenProduct.create({
      data: {
        userId: userId || null, // Allow null for guest users
        productId: product.id,
      },
    });

    return seenProduct;
  } catch (error) {
    console.error("Error creating SeenProduct:", error);
    throw error; // Handle error as needed
  }
}
