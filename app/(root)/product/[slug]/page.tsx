import React from 'react';
import { auth } from "@/auth";
import { createSeenProduct } from "@/lib/actions/product";
import ProductDetail from '@/components/ProductDetail';
import { getProductDetails } from "@/lib/actions/product";

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
  const size = (searchParams.size as string) || 'Medium';
  const quantity = typeof searchParams.quantity === 'string' ? parseInt(searchParams.quantity) : 1;
  const image = (searchParams.image as string) || '/product/big-shirt.png';

  const session = await auth();
  await createSeenProduct({ slug, userId: Number(session?.user?.id) ?? 0 });
  const product = await getProductDetails(slug);

  return (
    <div className='mt-16'>
      <ProductDetail 
        product={product} 
        size={size} 
        image={image} 
        quantity={quantity} 
        searchParams={searchParams} 
        pathname={`/product/${slug}`} 
      />
    </div>
  );
};

export default Page;