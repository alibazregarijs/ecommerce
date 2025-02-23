"use client";
import React, { useState } from "react";
import { Searchbox } from "@/components/SearchBox";
import { ShoppingCart } from "iconsax-react";
import { ProfileCircle } from "iconsax-react";
import { HambergerMenu } from "iconsax-react";
import { SearchNormal1 } from "iconsax-react";
import CartModal from "@/components/CartModal";

const Navbar = ({ userId }: { userId: string }) => {
  const [isOpen, setIsOpen] = useState({ hamburger: false, search: false });

  const [shoppingCartClicked, setShoppingCartClicked] = useState(false);

  const handleToggle = ({ type }: { type: "hamburger" | "search" }) => {
    setIsOpen(
      type === "hamburger"
        ? { hamburger: !isOpen.hamburger, search: false }
        : { hamburger: false, search: !isOpen.search }
    );
  };
  return (
    <nav>
      <div className="sm:flex md:hidden mx-2 flex-col justify-center items-center mt-6">
        <div className="flex justify-between  w-full items-center">
          <div className="flex justify-center items-center space-x-2">
            <HambergerMenu
              onClick={() => handleToggle({ type: "hamburger" })}
              size="24"
              color="#000"
            />
            <h1 className="font-extrabold text-2xl">SHOP.CO </h1>
          </div>
          <div className="flex justify-center items-center space-x-3">
            <SearchNormal1
              onClick={() => handleToggle({ type: "search" })}
              size="24"
              color="#000"
            />
            <ShoppingCart
              onClick={() => setShoppingCartClicked((prev) => !prev)}
              className="cursor-pointer"
              size="24"
              color="#000"
            />
            <ProfileCircle className="cursor-pointer" size="24" color="#000" />
          </div>
        </div>
        {isOpen.hamburger && (
          <div className="absolute border top-[60px] mt-6 left-0 w-full bg-white shadow-md z-10">
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
      <div className="md:flex md:mx-4 hidden justify-center items-center  mt-6">
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
          <ShoppingCart
            onClick={() => setShoppingCartClicked((prev) => !prev)}
            className="cursor-pointer"
            size="24"
            color="#000"
          />
          <ProfileCircle className="cursor-pointer" size="24" color="#000" />
        </div>
      </div>
      {shoppingCartClicked && (
        <CartModal
          userId={userId}
          shoppingCartClicked={shoppingCartClicked}
          setShoppingCartClicked={setShoppingCartClicked}
        />
      )}
    </nav>
  );
};

export default Navbar;
