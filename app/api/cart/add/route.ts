import { NextResponse } from "next/server";
import { PrismaClient, Size } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const {
      userId,
      productId,
      quantity,
      size,
    }: { userId: number; productId: number; quantity: number; size: string } =
      await req.json();

    let cart = await prisma.cart.findFirst({
      where: { userId },
      include: { items: { include: { product: true } } }, // Include product details
    });

    let cartItem;

    if (!cart) {
      // If the cart doesn't exist, create one and add the item
      cart = await prisma.cart.create({
        data: {
          userId,
          items: {
            create: [
              {
                productId: Number(productId),
                size: size as Size,
                quantity: Number(quantity),
              },
            ],
          },
        },
        include: { items: { include: { product: true } } }, // Include product details
      });

      cartItem = cart.items.find(
        (item) => item.productId === Number(productId) && item.size === size
      );
    } else {
      // Find if the item already exists in the cart
      cartItem = cart.items.find(
        (item) => item.productId === Number(productId) && item.size === size
      );

      if (cartItem) {
        // Update existing cart item
        cartItem = await prisma.cartItem.update({
          where: { id: cartItem.id },
          data: { quantity: cartItem.quantity + Number(quantity) },
          include: { product: true }, // Include product details
        });
      } else {
        // Create a new cart item
        cartItem = await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId: Number(productId),
            size: size as Size,
            quantity: Number(quantity),
          },
          include: { product: true }, // Include product details
        });
      }
    }

    return NextResponse.json({
      id: cartItem?.id,
      productId: cartItem?.productId,
      size: cartItem?.size,
      quantity: cartItem?.quantity,
      product: {
        id: cartItem?.product.id,
        name: cartItem?.product.name,
        price: cartItem?.product.price,
        images: cartItem?.product.images,
        description: cartItem?.product.description,
        quantityInStore: cartItem?.product.quantity,
      },
    });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
