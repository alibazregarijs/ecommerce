import React from "react";
import Image from "next/image";
import { renderStars } from "@/lib/utils";
import { Button } from "./ui/button";
import { ProductProps } from "@/type";

const ListingProduct = ({ products }: { products: ProductProps[] }) => {
  const rating = 3.5;

  return (
    <div className="flex flex-col items-center px-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        {products.map((product, index) => (
          <div key={index} className="flex flex-col items-start">
            {/* Check if the product image is valid */}
            {product?.image ? (
              <Image
                src={product.image}
                alt={product.name}
                quality={100}
                width={296}
                height={298}
              />
            ) : (
              <div className="w-[296px] h-[298px] bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Image not available</span>
              </div>
            )}
            
            <div className="flex flex-col mt-4">
              <h3 className="font-bold">{product.name}</h3>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex gap-2">
                  {renderStars({ rating: rating })}
                </div>
                <p className="text-sm">{rating}/5</p>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <h3 className="font-bold text-lg">
                  {Number.isInteger(product.price)
                    ? `$${product.price}`
                    : `$${product.price.toFixed(2)}`}
                </h3>
                {product.isDiscountValid && (
                  <div className="flex items-center space-x-4">
                    <h3 className="font-bold text-lg text-black/40 line-through">
                      $
                      {Number.isInteger(product.discountedPrice ?? product.price)
                        ? `${product.discountedPrice ?? product.price}`
                        : `${(product.discountedPrice ?? product.price).toFixed(2)}`}
                    </h3>
                    <div className="bg-[#FF3333]/10 rounded-full px-3 py-1">
                      <h3 className="font-bold text-sm text-[#FF3333]">
                        -{product.discount?.percentage}%
                      </h3>
                    </div>
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
