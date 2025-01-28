"use client";
import React, { useState } from "react";
import { Searchbox } from "@/components/SearchBox";
import { ShoppingCart } from "iconsax-react";
import { ProfileCircle } from "iconsax-react";
import { HambergerMenu } from "iconsax-react";
import { SearchNormal1 } from "iconsax-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState({ hamburger: false, search: false });

  const handleToggle = ({ type }: { type: "hamburger" | "search" }) => {
    console.log(type);
    console.log(isOpen);
    setIsOpen(
      type === "hamburger"
        ? { hamburger: !isOpen.hamburger, search: false }
        : { hamburger: false, search: !isOpen.search }
    );
  };
  return (
    <nav>
      <div className="sm:flex md:hidden flex-col justify-between items-center mt-6">
        <div className="flex justify-around w-full items-center">
          <div className="flex justify-center items-center space-x-4">
            <HambergerMenu
              onClick={() => handleToggle({ type: "hamburger" })}
              size="24"
              color="#000"
            />
            <h1 className="font-extrabold text-3xl">SHOP.CO </h1>
          </div>
          <div className="flex justify-center items-center space-x-3">
            <SearchNormal1
              onClick={() => handleToggle({ type: "search" })}
              size="24"
              color="#000"
            />
            <ShoppingCart size="24" color="#000" />
            <ProfileCircle size="24" color="#000" />
          </div>
        </div>
        {isOpen.hamburger && (
          <div className="absolute top-[60px] mt-8 left-0 w-full bg-white shadow-md z-10">
            <div className="flex justify-center items-center space-x-10">
              <span className="text-[16px] text-black">Shop</span>
              <span className="text-[16px] text-black">On Sale</span>
              <span className="text-[16px] text-black">New Arrivals</span>
              <span className="text-[16px] text-black">Brands</span>
            </div>
          </div>
        )}

        {isOpen.search && (
          <div className="absolute top-[60px] mt-4 left-0 w-full bg-white shadow-md z-10">
            <div className="flex justify-center items-center space-x-4">
              <Searchbox />
            </div>
          </div>
        )}
      </div>

      {/* desktop  */}
      <div className="md:flex hidden justify-center items-center  mt-6">
        <div className="flex justify-center items-center">
          <h1 className="font-extrabold text-3xl">SHOP.CO</h1>
        </div>
        <div className="flex justify-center items-center mx-10 space-x-4">
          <span className=" text-[16px]">Shop</span>
          <span className=" text-[16px] text-nowrap">On Sale</span>
          <span className=" text-[16px] text-nowrap">New Arrivals</span>
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
