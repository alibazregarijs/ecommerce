import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const productsWithDiscounts = await prisma.product.findMany({
      include: { discount: true },
    });

    // Get current date in Iran's timezone (Asia/Tehran)
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

    const formattedProducts = productsWithDiscounts.map((product) => {
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
            finalPrice =
              product.price * (1 - product.discount.percentage / 100);
          }
        }
      }

      return {
        ...product,
        originalPrice: product.price,
        discountedPrice: isDiscountValid ? finalPrice : product.price,
        isDiscountValid,
      };
    });

    return NextResponse.json(formattedProducts, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
