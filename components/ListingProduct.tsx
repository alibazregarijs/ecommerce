import React from "react";
import { Button } from "./ui/button";
import { ProductProps } from "@/type";
import Product from "./Product";

const ListingProduct = React.memo(({ products, userId, setViewAll }: {
  products: ProductProps[];
  userId: number;
  setViewAll: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="flex flex-col items-center px-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        {products.map((product, index) => (
          <Product userId={userId} productDetail={false} key={index} product={product} />
        ))}
      </div>
      <div className="mt-10">
        <Button onClick={() => setViewAll(8)} className="bg-black text-white hover:bg-white hover:text-black">
          View All
        </Button>
      </div>
      <div className="border w-full mt-10"></div>
    </div>
  );
});

export default ListingProduct;
