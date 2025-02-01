import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    console.log("salam")
    console.log("Fetching related products...");

    // Parse the request body
    const { userId, limit = 5 } = await req.json();
    console.log("Received userId:", userId);

    // Validate userId
    if (!userId) {
      console.error("Missing userId");
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    // Get the last viewed product for the user
    const lastProduct = await prisma.seenProduct.findFirst({
      where: { userId },
      orderBy: { viewedAt: "desc" },
    });

    console.log("Last viewed product:", lastProduct);

    // If no last product found, return an empty array
    if (!lastProduct) {
      console.log("No last product found for userId:", userId);
      return NextResponse.json([], { status: 200 });
    }

    // Get the last product details along with categories
    const product = await prisma.product.findUnique({
      where: { id: lastProduct.productId },
      include: { categories: true },
    });

    console.log("Product details:", product);

    // If the product doesn't exist, return a 404 error
    if (!product) {
      console.error("Product not found for productId:", lastProduct.productId);
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Fetch related products based on the current product
    const relatedProducts = await prisma.product.findMany({
      where: {
        AND: [
          { id: { not: lastProduct.productId } }, // Exclude the current product
          {
            OR: [
              // Products in the same categories
              {
                categories: {
                  some: {
                    id: { in: product.categories.map((cat) => cat.id) },
                  },
                },
              },
              // Products with similar names (basic similarity check)
              {
                name: {
                  contains: product.name.split(" ")[0],
                  mode: "insensitive",
                },
              },
            ],
          },
        ],
      },
      include: { categories: true, discount: true },
      take: limit,
    });

    console.log("Related products:", relatedProducts);

    // If no related products, return fallback products
    if (relatedProducts.length === 0) {
      console.log("No related products found, returning fallback products");
      const fallbackProducts = await prisma.product.findMany({
        orderBy: { createdAt: "asc" },
        take: 3,
        include: { categories: true, discount: true }, // Include categories and discount for consistency
      });
      return NextResponse.json(fallbackProducts, { status: 200 });
    }

    // Return the related products
    return NextResponse.json(relatedProducts, { status: 200 });
  } catch (error) {
    console.error("Error fetching related products:", error);
    return NextResponse.json(
      { error: "Failed to fetch related products" },
      { status: 500 }
    );
  }
}