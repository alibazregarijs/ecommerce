import React from "react";
import { auth } from "@/auth";
import { createSeenProduct } from "@/lib/actions/product";
import ProductDetail from "@/components/ProductDetail";
import { getProductDetails } from "@/lib/actions/product";
import CommentSection from "@/components/CommentSection";

// Define the type for searchParams
type SearchParams = {
  [key: string]: string | string[] | undefined;
};

// Define the type for the component props
interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SearchParams>;
}

const Page = async (props: PageProps) => {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const slug = params.slug;

  // Extract query parameters
  const size = (searchParams.size as string) || "M";
  const quantity =
    typeof searchParams.quantity === "string"
      ? parseInt(searchParams.quantity)
      : 1;
  const image = (searchParams.image as string) || "/product/big-shirt.png";

  const session = await auth();
  const userId = Number(session?.user?.id);

  await createSeenProduct({ slug, userId: userId ?? 0 });
  const productData = await getProductDetails(slug);

  const product = productData
    ? {
        ...productData,
        size: size,
        rating: productData.averageRating || 0,
      }
    : null;



  return (
    <div className="mt-16">
      {product && (
        <ProductDetail
          product={product}
          size={size}
          image={image}
          userId={userId}
          quantity={quantity}
          searchParams={searchParams}
          pathname={`/product/${slug}`}
        />
      )}
      <CommentSection productId={product?.id!} userId={userId} username={session?.user?.name!} />
    </div>
  );
};

export default Page;
