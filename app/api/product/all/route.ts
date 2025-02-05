import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const limit = req.nextUrl.searchParams.get('limit'); // Get limit from query params
  console.log(limit,"limit")
    const limitNumber = limit ? parseInt(limit) : 4;

    console.log(limit)
  try {
    const productsWithDiscountsAndRatings = await prisma.product.findMany({
      include: {
        discount: true,
        ratings: true, // Include ratings for calculating the average rating
      },
      take: limitNumber,
    });

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

    const formattedProducts = productsWithDiscountsAndRatings.map((product) => {
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

      // Calculate average rating
      const totalRatings = product.ratings.reduce(
        (sum, rating) => sum + rating.rating,
        0
      );
      const averageRating =
        product.ratings.length > 0
          ? totalRatings / product.ratings.length
          : null;

      return {
        ...product,
        originalPrice: product.price,
        discountedPrice: isDiscountValid ? finalPrice : product.price,
        isDiscountValid,
        averageRating, // Include average rating
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
