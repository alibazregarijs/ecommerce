import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Header = () => {
  return (
    <div className="relative flex justify-center items-center mt-6">
      <div className="relative">
        <Image
          objectFit="cover"
          quality={100}
          src="/header.png"
          alt="header"
          width={1440}
          height={663}
        />
        <div className="absolute inset-y-72 top-0 right-0 flex items-center">
          <Image src="/big-vector.png" alt="logo" width={104} height={104} />
        </div>
        <div className="absolute inset-y-0 top-0 l right-0 left-0 flex items-center">
          <Image src="/big-vector.png" alt="logo" width={56} height={56} />
        </div>
      </div>
      <div className="absolute inset-y-20 top-0 right-0 left-4 flex items-center w-[577px] mx-[100px]">
        <div className="flex flex-col justify-center items-start space-y-8">
          <h1 className="font-extrabold text-[60px] leading-none">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <span className="text-[16px]">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </span>

          <Button className="bg-black text-white hover:text-black">
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
