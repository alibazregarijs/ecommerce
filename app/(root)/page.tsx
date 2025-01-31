import React from "react";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { getProducts } from "@/lib/actions/product";
import {getRelatedProducts} from "@/lib/actions/product";
import { auth } from "@/auth";


const page = async () => {

  const products = await getProducts();
  const session = await auth();
  const userId = session?.user?.id
  const relatedProducts = await getRelatedProducts(3,Number(userId) ?? 0 );

 

  return (
    <>
      <Navbar />
      <Header />
      <Hero products={products} relatedProducts={relatedProducts ?? []} />
      <Footer/>
    </>
  );
};

export default page;
