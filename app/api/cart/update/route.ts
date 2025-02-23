import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import {prisma} from "@/lib/prisma";

export async function PUT(req: Request) {
  try {
    const { userId, productId, size, quantity } = await req.json();

    await prisma.$transaction(async (prisma) => {
      const cartItem = await prisma.cartItem.findFirst({
        where: {
          productId: Number(productId),
          size,
          cart: { userId: Number(userId) },
        },
        select: { id: true, quantity: true },
      });

      if (!cartItem) {
        throw new Error("Item not found in cart");
      }

      const newQuantity = Math.max(0, quantity);

      await prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity: newQuantity },
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating cart item:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
