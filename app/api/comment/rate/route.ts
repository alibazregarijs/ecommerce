import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust the import based on your setup

export async function PUT(req: NextRequest) {
  try {
    console.log("salam");
    const body = await req.json();
    let { userId, commentId, rating } = body;
    userId = Number(userId);
    commentId = Number(commentId);

    // Validate input
    if (!userId || !commentId || !rating) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create comment in the database
    const newComment = await prisma.rating.upsert({
      where: { userId_commentId: { userId, commentId } },
      create: {
        userId,
        commentId,
        rating,
      },
      update: {
        rating,
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
