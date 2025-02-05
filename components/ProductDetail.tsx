"use client";
import React , {useState} from "react";
import Image from "next/image";
import Product from "@/components/Product";
import { ProductProps } from "@/type";
import { TickCircle } from "iconsax-react";
import { Button } from "./ui/button";

const ProductDetail = ({ product }: { product: ProductProps }) => {
    const [quantity, setQuantity] = useState(1);

  return (
    <section>
      <div className="grid mx-16 md:grid-cols-12 gap-2 grid-cols-1 md:grid-rows-3 md:gap-4">
        <div className="md:col-span-2 col-span-12 space-y-3 md:md:order-1 order-2">
          <div>
            <Image
              src="/product/shirt2.png"
              alt="shirt"
              className="w-[152px] h-[168px] rounded-[20px] border-2 border-black"
              width={152}
              height={168}
              quality={100}
            />
          </div>
          <div>
            <Image
              src="/product/shirt2.png"
              alt="shirt"
              className="w-[152px] h-[168px]"
              width={152}
              height={168}
              quality={100}
            />
          </div>
          <div>
            <Image
              src="/product/shirt3.png"
              alt="shirt"
              className="w-[152px] h-[168px]"
              width={152}
              height={168}
              quality={100}
            />
          </div>
        </div>
        <div className="md:col-span-4 col-span-12 md:md:order-2 order-1 ">
          <Image
            src="/product/big-shirt.png"
            className="w-[440px] h-[530px]"
            alt="shirt"
            width={440}
            height={530}
            quality={100}
          />
        </div>
        <div className="md:col-span-6 col-span-12 md:order-3 order-3">
          <Product product={product} productDetail={true} userId={2} />
          <div className="flex flex-col justify-center items-start mt-8">
            <p className="text-sm text-gray-500 font-mono">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
              deleniti soluta perferendis ullam veritatis et incidunt nisi
              similique dolorem corrupti?
            </p>
            <div className="border bottom-1 border-gray-200 w-full mt-10"></div>
          </div>
          <div className="flex flex-col space-y-2 justify-center items-start">
            <p className="text-sm text-gray-500 font-mono mt-4">
              Select Colors
            </p>
            <div className="flex justify-center space-x-2 items-center">
              <div className="relative cursor-pointer w-[37px] h-[37px] rounded-full bg-[#4F4631] flex items-center justify-center">
                <TickCircle size="32" color="#ffffff" />
              </div>
              <div className="relative cursor-pointer w-[37px] h-[37px] rounded-full bg-[#314F4A] flex items-center justify-center"></div>
              <div className="relative cursor-pointer w-[37px] h-[37px] rounded-full bg-[#31344F] flex items-center justify-center"></div>
            </div>
          </div>
          <div className="border bottom-1 border-gray-200 w-full mt-10"></div>
          <div className="flex flex-col space-y-2 justify-center items-start">
            <p className="text-sm text-gray-500 font-mono mt-4">Choose Size</p>
            <div className="flex justify-center space-x-2 items-center">
              <Button className="bg-gray-200 hover:bg-black hover:text-white">
                Small
              </Button>
              <Button className="bg-gray-200 hover:bg-black hover:text-white">
                Medium
              </Button>
              <Button className="bg-gray-200 hover:bg-black hover:text-white">
                Large
              </Button>
              <Button className="bg-gray-200 hover:bg-black hover:text-white">
                X-Large
              </Button>
            </div>
          </div>
          <div className="border bottom-1 border-gray-200 w-full mt-10"></div>
          <div className="flex justify-between space-x-2">
            <div className="flex items-center space-x-4 mt-7">
              {/* Decrement Button */}
              <Button
                className="bg-gray-200 hover:bg-black hover:text-white px-4 py-2"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </Button>

              {/* Quantity Display */}
              <span className="text-lg font-bold ">{quantity}</span>

              {/* Increment Button */}
              <Button
                className="bg-gray-200 hover:bg-black hover:text-white px-4 py-2"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </Button>
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
