import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust the import based on your setup

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    let { userId, commentId, content } = body;
    console.log(userId, commentId, content, "commentId");
    userId = Number(userId);

    commentId = Number(commentId);

    console.log("salam in content")

    // Validate input
    if (!userId || !commentId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create comment in the database
    const newComment = await prisma.comment.update({
      where: { id: commentId },
      data: {
        content,
      },
      
    });

    console.log(newComment, "newComment");
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error("Error updating comment:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
