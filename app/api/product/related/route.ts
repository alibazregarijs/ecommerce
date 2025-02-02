import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import axios from "axios";
import { ProductProps } from "@/type";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { userId, limit = 5 } = await req.json();

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

    // If no last product found, return an empty array
    if (!lastProduct) {
      const fetchProducts = await axios.get<ProductProps[]>("http://localhost:3000/api/product/all?limit=3");
      console.log("Fetched Products:", fetchProducts.data);
      return NextResponse.json(fetchProducts.data, { status: 200 });
    }
    

    // Get the last product details along with categories
    const product = await prisma.product.findUnique({
      where: { id: lastProduct.productId },
      include: { categories: true },
    });

    // If the product doesn't exist, return a 404 error
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    console.log("Last Product Categories:", product.categories);
    console.log("Product Name:", product.name);

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

    console.log("Related Products:", relatedProducts);

    // If no related products, return fallback products

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
