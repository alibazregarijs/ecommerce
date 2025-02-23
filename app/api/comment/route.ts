import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const body = await req.json();

  let { userId, productId , newest } = body;
  if (!userId || !productId) {
    return new Response("Missing required fields", { status: 400 });
  }
  userId = Number(userId);
  productId = Number(productId);

  console.log( newest ? "desc" : "asc")

  try {
    const comments = await prisma.product.findMany({
      where: {
        id: productId,
      },
      orderBy: {
        createdAt: newest ? "desc" : "asc",
      },
      include: {
        comments: true,
        ratings: {
          where: {
            userId: userId, // Check if the logged-in user has rated this comment
          },
          select: {
            rating: true, // Get the rating value
          },
        },
      },
    });

    return comments.map((comment) => ({
      ...comment,
      userRating: comment.ratings.length > 0 ? comment.ratings[0].rating : null, // Get rating or null
    }));
  } catch (error) {
    console.error("Error fetching comments:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
