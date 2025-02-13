import { NextResponse } from "next/server";
import { PrismaClient, Size } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: Request) {
  try {
    const {
      userId,
      productId,
      size,
    }: { userId: number; productId: number; size: string } = await req.json();

    console.log(userId, "userId", productId, "productId", size, "size");

    // Find the user's cart
    let cart = await prisma.cart.findFirst({
      where: { userId },
      include: { items: { include: { product: true } } }, // Include product details
    });

    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    // Find the cart item
    let cartItem = cart.items.find(
      (item) => item.productId === Number(productId) && item.size === size
    );

    if (!cartItem) {
      return NextResponse.json({ error: "Item not found in cart" }, { status: 404 });
    }

    // Ensure the quantity never goes below 0
    const newQuantity = Math.max(cartItem.quantity - 1, 0);

    // Update cart item in the database
    cartItem = await prisma.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity: newQuantity },
      include: { product: true }, // Include product details
    });

    return NextResponse.json({
      id: cartItem.id,
      productId: cartItem.productId,
      size: cartItem.size,
      quantity: cartItem.quantity,
      product: {
        id: cartItem.product.id,
        name: cartItem.product.name,
        price: cartItem.product.price,
        images: cartItem.product.images,
      },
    });
  } catch (error) {
    console.error("Error updating cart item:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
