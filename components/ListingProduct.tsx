"use client";
import React from "react";
import Image from "next/image";
import { renderStars } from "@/lib/utils";
import { Button } from "./ui/button";
import { ProductProps } from "@/type";
import Spinner from "./Spinner";
import Product from "./Product";

const ListingProduct = ({
  products,
  loading,
  userId
}: {
  products: ProductProps[];
  loading: boolean;
  userId: number;
}) => {
  const rating = 3.5;

  if (loading) {
    return <Spinner loading={true} />;
  }

  return (
    <div className="flex flex-col items-center px-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        {products.map((product, index) => (
          <Product userId={userId} key={index} product={product} />
        ))}
      </div>
      <div className="mt-10">
        <Button className="bg-black text-white hover:bg-white hover:text-black">
          View All
        </Button>
      </div>
      <div className="border w-full mt-10"></div>
    </div>
  );
};

export default ListingProduct;
