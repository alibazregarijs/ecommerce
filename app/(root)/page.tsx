import React from "react";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { getProducts } from "@/lib/actions/product";
const page = async () => {

  const products = await getProducts();
  console.log(products)
  return (
    <>
      <Navbar />
      <Header />
      <Hero products={products} />
      <Footer/>
    </>
  );
};

export default page;
