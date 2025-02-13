import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: Request) {
  try {
    const {
      userId,
      productId,
      size,
      type,
    }: { userId: number; productId: number; size: string; type: string } =
      await req.json();

    console.log(
      userId,
      "userId",
      productId,
      "productId",
      size,
      "size",
      type,
      "type",
      "routeeeeeee"
    );

    // Find the user's cart
    const cart = await prisma.cart.findFirst({
      where: { userId: Number(userId) },
      include: { items: { include: { product: true } } }, // Include product details
    });

    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    // Find the cart item
    const cartItem = cart.items.find(
      (item) => item.productId === Number(productId) && item.size === size
    );

    if (!cartItem) {
      return NextResponse.json(
        { error: "Item not found in cart" },
        { status: 404 }
      );
    }

    // Handle "remove" type
    if (type === "remove") {
      const newQuantity = cartItem.quantity - 1;

      // If the new quantity is 0 or less, delete the cart item
      if (newQuantity <= 0) {
        await prisma.cartItem.delete({
          where: { id: cartItem.id },
        });

        return NextResponse.json({
          message: "Item removed from cart",
          id: cartItem.id,
          productId: cartItem.productId,
          size: cartItem.size,
          quantity: 0,
        });
      }

      // Otherwise, update the quantity
      const updatedCartItem = await prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity: newQuantity },
        include: { product: true }, // Include product details
      });

      return NextResponse.json({
        id: updatedCartItem.id,
        productId: updatedCartItem.productId,
        size: updatedCartItem.size,
        quantity: updatedCartItem.quantity,
        product: {
          id: updatedCartItem.product.id,
          name: updatedCartItem.product.name,
          price: updatedCartItem.product.price,
          images: updatedCartItem.product.images,
          description: updatedCartItem.product.description,
        },
      });
    }

    // Handle "add" type
    if (type === "add") {
      const updatedCartItem = await prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity: cartItem.quantity + 1 },
        include: { product: true }, // Include product details
      });

      return NextResponse.json({
        id: updatedCartItem.id,
        productId: updatedCartItem.productId,
        size: updatedCartItem.size,
        quantity: updatedCartItem.quantity,
        product: {
          id: updatedCartItem.product.id,
          name: updatedCartItem.product.name,
          price: updatedCartItem.product.price,
          images: updatedCartItem.product.images,
          description: updatedCartItem.product.description,
        },
      });
    }

    // If type is neither "add" nor "remove", return an error
    return NextResponse.json(
      { error: "Invalid type. Allowed values are 'add' or 'remove'." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error updating cart item:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}