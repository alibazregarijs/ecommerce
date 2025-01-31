import React from "react";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { getProducts } from "@/lib/actions/product";
import {getRelatedProducts} from "@/lib/actions/product";

const page = async () => {

  const products = await getProducts();
  const relatedProducts = await getRelatedProducts(1 , 3);

  console.log(relatedProducts)

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
