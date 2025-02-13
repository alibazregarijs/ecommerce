import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const userId = Number(params.id);

    if (!userId) {
      return NextResponse.json(
        { error: "Invalid or missing user ID" },
        { status: 400 }
      );
    }

    // Fetch the user's cart along with its items and product details
    const cart = await prisma.cart.findFirst({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                images: true,
              },
            },
          },
        },
      },
    });

    if (!cart) {
      return NextResponse.json(
        { message: "Cart not found", cart: [], totalPrice: 0 },
        { status: 200 }
      );
    }

    // Calculate total price
    const totalPrice = cart.items.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);

    return NextResponse.json(
      { message: "Cart retrieved successfully", cart: cart.items, totalPrice },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving cart:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
