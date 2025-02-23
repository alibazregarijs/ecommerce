// app/api/rate-product/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust the path according to your Prisma client setup

// Handler function to update the product rating
export async function PUT(request: NextRequest) {
  try {
    const { productId, rating, userId } = await request.json();

    if (
      typeof userId !== "number" ||
      typeof productId !== "number" ||
      typeof rating !== "number"
    ) {
      return NextResponse.json(
        { error: "Invalid input data." },
        { status: 400 }
      );
    }

    // Use upsert to either update the existing rating or create a new one
    const updatedRating = await prisma.rating.upsert({
      where: {
        userId_productId: { userId, productId },
      },
      update: {
        rating, // Update the rating value if it already exists
      },
      create: {
        userId, // Create a new rating if it doesn't exist
        productId,
        rating,
      },
    });

    return NextResponse.json(updatedRating, { status: 200 });
  } catch (error) {
    console.error("Error updating rating:", error);
    return NextResponse.json(
      { error: "Unable to update the rating." },
      { status: 500 }
    );
  }
}
