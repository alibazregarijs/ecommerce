import React from 'react'
import { auth } from "@/auth";
import {createSeenProduct} from "@/lib/actions/product";
import ProductDetail from '@/components/ProductDetail';

const page = async ({params}: {params: Promise<{slug: string}>}) => {
  const slug = (await params).slug;
  const session = await auth();
  const product = await createSeenProduct({ slug, userId: Number(session?.user?.id) ?? 0 });


  return (
    <div className='mt-16'>
      <ProductDetail/>
    </div>
  )
}

export default page