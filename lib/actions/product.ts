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
  console.log(formattedDate)

  

  const formattedProducts = productsWithDiscounts.map(
    (product: ProductProps) => {
      let finalPrice = product.price;
      let isDiscountValid = false;

      if (product.discount) {
        // Check if the discount is within the valid time range
        const isWithinDateRange =
          (!product.discount.startDate ||
            product.discount.startDate <= new Date(formattedDate)) &&
          (!product.discount.endDate || product.discount.endDate >= new Date(formattedDate));

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
