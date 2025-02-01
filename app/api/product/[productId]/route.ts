import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/product/:productId
export async function GET(req: Request, context: { params?: { productId?: string } }) {
  try {
    // Await the params object before accessing it
    const { params } = await context;

    // Ensure params and productId exist
    if (!params || !params?.productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    // Parse productId as an integer
    const productId = parseInt(params.productId, 10);
    if (isNaN(productId)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    // Fetch the product including its ratings
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        ratings: true, // Include ratings for calculating average
      },
    });

    // Check if the product exists
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Calculate the average rating
    const averageRating =
      product.ratings.length > 0
        ? product.ratings.reduce((sum, rating) => sum + rating.rating, 0) /
          product.ratings.length
        : 0;

    // Return the product data with the calculated average rating
    return NextResponse.json({ ...product, averageRating }, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}