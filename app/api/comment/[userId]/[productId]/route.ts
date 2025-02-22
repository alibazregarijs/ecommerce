import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  props: { params: Promise<{ userId: string; productId: string }> }
) {
  const params = await props.params;
  const userId = Number(params.userId);
  const productId = Number(params.productId);

  try {
    // Fetch comments for the product, including the user's fullName and their rating
    const comments = await prisma.comment.findMany({
      where: {
        productId: productId, // Filter comments by productId
      },
      include: {
        user: {
          select: {
            fullName: true, // Include the fullName of the user who made the comment
          },
        },
        ratings: {
          where: {
            userId: userId, // Filter ratings by the logged-in user
          },
          select: {
            rating: true, // Get the rating value
          },
        },
      },
    });

    // Modify comments to include userRating and fullName
    const modifiedComments = comments.map((comment) => ({
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      name: comment.user.fullName, // Include the user's fullName
      rating: comment.ratings.length > 0 ? comment.ratings[0].rating : null, // Get rating or null
      productId: comment.productId,
    }));

    console.log(modifiedComments, "modifiedComments");
    return NextResponse.json(modifiedComments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
