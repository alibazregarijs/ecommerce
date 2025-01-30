import React from "react";
import Image from "next/image";
import { renderStars } from "@/lib/utils";
import { Button } from "./ui/button";

const ListingProduct = ({ rating = 3.5 }) => {
  return (
    <div className="flex flex-col items-center px-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        {[
          { src: "/product/t-shirt1.png", price: 49.99, discount: 59.99 },
          { src: "/product/jin.png", price: 49.99 },
          { src: "/product/shirt.png", price: 49.99 },
          { src: "/product/t-shirt2.png", price: 49.99 },
        ].map((product, index) => (
          <div
            key={index}
            className="flex flex-col items-start"
          >
            <Image
              src={product.src}
              alt="t-shirt"
              quality={100}
              width={296}
              height={298}
            />
            <div className="flex flex-col mt-4">
              <h3 className="font-bold">T-shirt with Tape Details</h3>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex gap-2">{renderStars({ rating })}</div>
                <p className="text-sm">{rating}/5</p>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <h3 className="font-bold text-lg">
                  ${product.price.toFixed(2)}
                </h3>
                {product.discount && (
                  <h3 className="font-bold text-lg text-black/40 line-through">
                    ${product.discount.toFixed(2)}
                  </h3>
                )}
                {product.discount && (
                  <div className="bg-[#FF3333]/10 rounded-full px-3 py-1">
                    <h3 className="font-bold text-sm text-[#FF3333]">
                      -
                      {Math.round(
                        ((product.discount - product.price) /
                          product.discount) *
                          100
                      )}
                      %
                    </h3>
                  </div>
                )}
              </div>
            </div>
          </div>
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
