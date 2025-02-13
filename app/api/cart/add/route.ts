import { NextResponse } from "next/server";
import { PrismaClient, Size } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    console.log("Processing add to cart...");
    
    const { userId, productId, quantity, size }: { 
      userId: number; 
      productId: number; 
      quantity: number; 
      size: string 
    } = await req.json();

    console.log("Received data:", { userId, productId, quantity, size });

    let cart = await prisma.cart.findFirst({
      where: { userId },
      include: { items: { include: { product: true } } },
    });

    let cartItem;

    if (!cart) {
      console.log("Cart not found, creating new cart...");
      
      cart = await prisma.cart.create({
        data: {
          userId,
          items: {
            create: [
              {
                productId,
                size: size as Size,
                quantity: 1,
              },
            ],
          },
        },
        include: { items: { include: { product: true } } },
      });

      cartItem = cart.items.find(
        (item) => item.productId === productId && item.size === size
      );
    } else {
      console.log("Cart exists, checking for item...");

      cartItem = cart.items.find(
        (item) => item.productId === productId && item.size === size
      );

      if (cartItem) {
        console.log("Item found, updating quantity...");

        cartItem = await prisma.cartItem.update({
          where: { id: cartItem.id },
          data: { quantity: cartItem.quantity + 1 }, // Increment by 1
          include: { product: true },
        });

      } else {
        console.log("Item not found, creating new cart item...");

        cartItem = await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId,
            size: size as Size,
            quantity: 1,
          },
          include: { product: true },
        });
      }
    }

    console.log("Updated cart item quantity:", cartItem?.quantity);

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
