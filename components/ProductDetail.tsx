import React from 'react';
import Image from 'next/image';
import Product from '@/components/Product';
import { ProductProps } from '@/type';
import { Button } from './ui/button';
import Link from 'next/link';

interface ProductDetailProps {
  product: ProductProps;
  size: string;
  image: string;
  quantity: number;
  searchParams: { [key: string]: string | string[] | undefined };
  pathname: string;
}

const ProductDetail = ({ 
  product, 
  size, 
  image, 
  quantity, 
  searchParams, 
  pathname 
}: ProductDetailProps) => {
  const initialQuantity = quantity || 1;
  const selectedSize = size || "Medium";
  const selectedImage = image || "/product/big-shirt.png";

  // Helper function to create query strings
  const createQueryString = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams as Record<string, string>);
    params.set(key, value);
    return `${pathname}?${params.toString()}`;
  };

  return (
    <section>
      <div className="grid mx-16 md:grid-cols-12 gap-2 grid-cols-1 md:grid-rows-3 md:gap-4">
        <div className="md:col-span-2 col-span-12 space-y-3 md:order-1 order-2">
          {["/product/shirt1.png", "/product/shirt2.png", "/product/shirt3.png"].map((img, index) => (
            <Link key={index} href={createQueryString("image", img)}>
              <Image
                src={img}
                alt="shirt"
                className={`w-[152px] h-[168px] rounded-[20px] border-2 cursor-pointer ${
                  selectedImage === img ? "border-black" : "border-transparent"
                }`}
                width={152}
                height={168}
                quality={100}
              />
            </Link>
          ))}
        </div>
        <div className="md:col-span-4 col-span-12 md:order-2 order-1">
          <Image
            src={selectedImage}
            className="w-[440px] h-[530px]"
            alt="shirt"
            width={440}
            height={530}
            quality={100}
          />
        </div>
        <div className="md:col-span-6 col-span-12 md:order-3 order-3">
          <Product product={product} productDetail={true} userId={2} />
          <div className="border bottom-1 border-gray-200 w-full mt-10"></div>
          <div className="flex flex-col space-y-2 justify-center items-start">
            <p className="text-sm text-gray-500 font-mono mt-4">Choose Size</p>
            <div className="flex justify-center space-x-2 items-center">
              {["Small", "Medium", "Large", "X-Large"].map((size) => (
                <Link key={size} href={createQueryString("size", size)}>
                  <Button className={`bg-gray-200 hover:bg-black hover:text-white ${selectedSize === size ? "bg-black text-white" : ""}`}>
                    {size}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
          <div className="border bottom-1 border-gray-200 w-full mt-10"></div>
          <div className="flex justify-between space-x-2">
            <div className="flex items-center space-x-4 mt-7">
              <Link href={createQueryString("quantity", String(Math.max(1, initialQuantity - 1)))}>
                <Button className="bg-gray-200 hover:bg-black hover:text-white px-4 py-2">-</Button>
              </Link>
              <span className="text-lg font-bold">{initialQuantity}</span>
              <Link href={createQueryString("quantity", String(initialQuantity + 1))}>
                <Button className="bg-gray-200 hover:bg-black hover:text-white px-4 py-2">+</Button>
              </Link>
            </div>
            <div className="mt-8">
              <Button className="bg-gray-200 hover:bg-black hover:text-white">Add to Cart</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;