import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/product/:productId
export async function GET(
  req: Request,
  context: { params: { productId?: string } } // Ensure params exists
) {
  try {
    const { params } = context;

    if (!params || !params.productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const productId = parseInt(params.productId);

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    // Fetch the product including its ratings
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        ratings: true, // Include ratings for calculating average
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Calculate the average rating
    const averageRating =
      product.ratings.length > 0
        ? product.ratings.reduce((sum, rating) => sum + rating.rating, 0) /
          product.ratings.length
        : 0;

    return NextResponse.json({ ...product, averageRating }, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
