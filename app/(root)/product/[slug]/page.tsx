import React from 'react'
import { auth } from "@/auth";
import {createSeenProduct} from "@/lib/actions/product";
import ProductDetail from '@/components/ProductDetail';
import { getProductDetails } from "@/lib/actions/product";

const page = async ({params}: {params: Promise<{slug: string}>}) => {
  const slug = (await params).slug;
  const session = await auth();
  await createSeenProduct({ slug, userId: Number(session?.user?.id) ?? 0 });
  const product = await getProductDetails(slug);


  return (
    <div className='mt-16'>
      <ProductDetail product={product}/>
    </div>
  )
}

export default page