import React from "react";
import ListingProduct from "@/components/ListingProduct";
import DifferentDress from "@/components/DifferentDress";
const Hero = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-[72px]">
      <h1 className="font-extrabold text-3xl">New Arrivals</h1>
      <div className="flex justify-center items-center space-x-4 mt-[56px]">
        <ListingProduct />
      </div>
      <div className="flex justify-center rounded-[40px] mt-[80px] w-[1240px] h-[866px] bg-[#F0F0F0]">
        <DifferentDress />
      </div>
    </div>
  );
};

export default Hero;
