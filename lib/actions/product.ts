import { PrismaClient } from "@prisma/client";
import { type ProductProps } from "@/type";

const prisma = new PrismaClient();




export async function createSeenProduct({
  slug,
  userId,
}: {
  slug: string;
  userId: number;
}) {
  const product = await prisma.product.findUnique({
    where: {
      slug: slug,
    },
    select: {
      id: true,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  try {
    const seenProduct = await prisma.seenProduct.create({
      data: {
        userId: userId || null, // Allow null for guest users
        productId: product.id,
      },
    });

    return seenProduct;
  } catch (error) {
    console.error("Error creating SeenProduct:", error);
    throw error; // Handle error as needed
  }
}
