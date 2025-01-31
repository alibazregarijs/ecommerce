import React from 'react'
import { auth } from "@/auth";
import {createSeenProduct} from "@/lib/actions/product";

const page = async ({params}: {params: Promise<{slug: string}>}) => {
  const slug = (await params).slug;
  const session = await auth();


 
  const product = await createSeenProduct({ slug, userId: Number(session?.user?.id) ?? 0 });


  return (
    <div>page</div>
  )
}

export default page