import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust the import based on your setup

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { userId, productId, content } = body;
    userId = Number(userId);
    productId = Number(productId);

    // Validate input
    if (!userId || !productId || !content) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create comment in the database
    const newComment = await prisma.comment.create({
      data: {
        userId,
        productId,
        content,
        createdAt: new Date(),
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
