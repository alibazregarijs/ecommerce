import { PrismaClient } from "@prisma/client";
import { type ProductProps } from "@/type";

const prisma = new PrismaClient();




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
export const getProductDetails = async (slug: string) => {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      discount: true,
      ratings: true, // Include ratings for calculating the average rating
    },
  });

  if (!product) return null;

  const currentDate = new Date();
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

  const parts = formatter.formatToParts(currentDate);
  const formattedDate = `${
    parts.find((p) => p.type === "year")?.value ?? "2023"
  }-${parts.find((p) => p.type === "month")?.value ?? "01"}-${
    parts.find((p) => p.type === "day")?.value ?? "01"
  } ${parts.find((p) => p.type === "hour")?.value ?? "00"}:${
    parts.find((p) => p.type === "minute")?.value ?? "00"
  }`;

  let finalPrice = product.price;
  let isDiscountValid = false;

  if (product.discount) {
    const isWithinDateRange =
      (!product.discount.startDate ||
        product.discount.startDate <= new Date(formattedDate)) &&
      (!product.discount.endDate ||
        product.discount.endDate >= new Date(formattedDate));

    if (isWithinDateRange) {
      isDiscountValid = true;
      if (product.discount.percentage) {
        finalPrice = product.price * (1 - product.discount.percentage / 100);
      }
    }
  }

  // Calculate average rating
  const totalRatings = product.ratings.reduce(
    (sum, rating) => sum + rating.rating,
    0
  );
  const averageRating =
    product.ratings.length > 0 ? totalRatings / product.ratings.length : null;

  return {
    ...product,
    originalPrice: product.price,
    discountedPrice: isDiscountValid ? finalPrice : product.price,
    isDiscountValid,
    averageRating, // Include average rating
  };
};

