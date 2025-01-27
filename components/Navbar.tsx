import React from "react";
import { Lexend_Giga } from "next/font/google";
import { Searchbox } from "@/components/SearchBox";
import { ShoppingCart } from "iconsax-react";
import { ProfileCircle } from "iconsax-react";

const lexendGiga = Lexend_Giga({
  variable: "--font-lexend-giga",
  subsets: ["latin"],
});

const Navbar = () => {
  return (
    <nav>
      <div className="flex justify-center items-center mt-6">
        <div className="flex justify-center items-center mx-10">
          <h1 className={`${lexendGiga.variable} font-bold text-3xl`}>
            SHOP.CO
          </h1>
        </div>
        <div className="flex justify-center items-center mx-10 space-x-4">
          <span className=" text-[16px]">Shop</span>
          <span className=" text-[16px]">On Sale</span>
          <span className=" text-[16px]">New Arrivals</span>
          <span className=" text-[16px]">Brands</span>
        </div>
        <div className="flex justify-center items-center w-[577px] h-12 border">
          <Searchbox />
        </div>
        <div className="flex justify-center items-center mx-10 space-x-4">
          <ShoppingCart size="24" color="#000" />
          <ProfileCircle size="24" color="#000" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
