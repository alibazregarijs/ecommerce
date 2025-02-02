"use client";
import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { ProductProps } from "@/type";
import Spinner from "./Spinner";
import Product from "./Product";

const ListingProduct = ({
  products,
  userId,
}: {
  products: ProductProps[];
  userId: number;
}) => {
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
