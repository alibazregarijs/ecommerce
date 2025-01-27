import React from "react";
import Image from "next/image";
import { renderStars } from "@/lib/utils";
import { Button } from "./ui/button";


const ListingProduct = ({ rating = 3.5 }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center items-center mt-12 space-x-5 ">
        <div className="flex flex-col justify-center items-start w-[296px] h-[298px]">
          <Image
            src="/product/t-shirt1.png"
            alt="t-shirt"
            quality={100}
            width={296}
            height={298}
          />
          <div className="flex flex-col justify-center items-start mt-4">
            <h3 className="font-bold">T-shirt with Tape Details</h3>
            <div className="flex justify-between items-center space-x-4 mt-2">
              <div className="flex justify-center items-center gap-2">
                {renderStars({ rating })}
              </div>
              <p className="text-sm">{rating}/5</p>
            </div>
            <div className="flex justify-center items-center space-x-4 rounded-lg mt-2">
              <h3 className="font-bold text-lg">$49.99</h3>
              <h3 className="font-bold text-lg text-black/40 line-through">
                $59.99
              </h3>
              <div className="flex justify-center items-center bg-[#FF3333]/10 rounded-full px-3 py-1">
                <h3 className="font-bold text-sm text-[#FF3333]">-23%</h3>
              </div>
            </div>
          </div>
        </div>

        {/* 2 */}

        <div className="flex flex-col justify-center items-start w-[296px] h-[298px]">
          <Image
            src="/product/jin.png"
            alt="t-shirt"
            quality={100}
            width={296}
            height={298}
          />
          <div className="flex flex-col justify-center items-start mt-4">
            <h3 className="font-bold">T-shirt with Tape Details</h3>
            <div className="flex justify-between items-center space-x-4 mt-2">
              <div className="flex justify-center items-center gap-2">
                {renderStars({ rating })}
              </div>
              <p className="text-sm">{rating}/5</p>
            </div>
            <h3 className="font-bold text-lg mt-2">$49.99</h3>
          </div>
        </div>

        {/* 3 */}

        <div className="flex flex-col justify-center items-start w-[296px] h-[298px]">
          <Image
            src="/product/shirt.png"
            alt="t-shirt"
            quality={100}
            width={296}
            height={298}
          />
          <div className="flex flex-col justify-center items-start mt-4">
            <h3 className="font-bold">T-shirt with Tape Details</h3>
            <div className="flex justify-between items-center space-x-4 mt-2">
              <div className="flex justify-center items-center gap-2">
                {renderStars({ rating })}
              </div>
              <p className="text-sm">{rating}/5</p>
            </div>
            <h3 className="font-bold text-lg mt-2">$49.99</h3>
          </div>
        </div>

        {/* 4 */}

        <div className="flex flex-col justify-center items-start w-[296px] h-[298px]">
          <Image
            src="/product/t-shirt2.png"
            alt="t-shirt"
            quality={100}
            width={296}
            height={298}
          />
          <div className="flex flex-col justify-center items-start mt-4">
            <h3 className="font-bold">T-shirt with Tape Details</h3>
            <div className="flex justify-between items-center space-x-4 mt-2">
              <div className="flex justify-center items-center gap-2">
                {renderStars({ rating })}
              </div>
              <p className="text-sm">{rating}/5</p>
            </div>
            <h3 className="font-bold text-lg mt-2">$49.99</h3>
          </div>
        </div>

        {/* 5 */}
      </div>
      <div className="flex justify-center items-center mt-28">
        <Button className="bg-black text-white hover:bg-white hover:text-black">View All</Button>
      </div>
      <div className="flex justify-center items-center border w-full mt-10"></div>
   
    </div>
  );
};

export default ListingProduct;
