import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Header = () => {
  return (
    <>
      {/* mobile */}
      <div className="sm:block md:hidden">
        <div className="flex justify-center items-center h-full w-full mt-12">
          <div className="flex flex-col h-full justify-center bg-[#F2F0F1] items-start mx-2 space-y-5 relative">
            <h1 className="font-extrabold text-4xl w-[316px] leading-none relative -top-5">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h1>
            <span className="text-[16px]">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </span>
            <Button className="bg-black w-full text-white hover:text-black">
              Shop Now
            </Button>
          </div>
        </div>
        <div className="relative w-full h-full">
          <Image
            src="/mobile-header.png"
            alt="hero"
            className="w-screen"
            width={390}
            height={448}
            quality={100}
          />
          <div className="absolute inset-y-0 top-16 right-0">
            <Image
              src="/big-vector.png"
              alt="vector"
              width={76}
              height={76}
              quality={100}
            />
          </div>
          <div className="absolute inset-y-0 top-60 left-0">
            <Image
              src="/small-vector.png"
              alt="vector"
              width={44}
              height={44}
              quality={100}
            />
          </div>
        </div>
      </div>
      {/* desktop */}
      <div className="md:flex hidden relative justify-center items-center mt-6">
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
        <div className="absolute inset-y-0 top-48 lg:left-0 lg:right-0 right-96  flex items-center">
          <Image src="/big-vector.png" alt="logo" width={56} height={56} />
        </div>
        <div className="flex lg:mx-12 absolute inset-y-0 right-0 left-4  items-center w-[577px]">
          <div className="flex  flex-col justify-center items-start space-y-8">
            <h1 className="font-extrabold md:text-[40px] lg:text-[60px] leading-none">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h1>

            <div className="md:w-[440px] ">
              <span className="text-[16px]">
                Browse through our diverse range of meticulously crafted
                garments, designed to bring out your individuality and cater to
                your sense of style.
              </span>
            </div>

            <div className="flex justify-start items-center w-full">
              <Button className="bg-black text-white hover:text-black">
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-3 w-full lg:grid-cols-5 gap-4 justify-center items-center bg-black py-6">
        <Image
          width={166}
          height={34}
          src="/versache.png"
          alt="versache-logo"
          className="mx-auto w-[116px] h-[24px] lg:w-[166px] lg:h-[34px]"
        />
        <Image
          width={92}
          height={38}
          src="/zara.png"
          alt="zara-logo"
          className="mx-auto w-[64px] h-[26px] lg:w-[92px] lg:h-[38px]"
        />
        <Image
          width={156}
          height={36}
          src="/gucci.png"
          alt="gucci-logo"
          className="mx-auto w-[110px] h-[26px] lg:w-[156px] lg:h-[36px]"
        />
        <Image
          width={194}
          height={32}
          src="/prada.png"
          alt="prada-logo"
          className="mx-auto w-[128px] h-[22px] lg:w-[194px] lg:h-[32px] lg:block hidden"
        />
        <Image
          width={206}
          height={34}
          src="/calvin.png"
          alt="calvin-logo"
          className="mx-auto w-[134px] h-[22px] lg:w-[206px] lg:h-[34px] lg:block hidden"
        />
      </div>

      <div className="w-full bg-black py-6 lg:hidden">
        <div className="grid grid-cols-2 gap-4 w-full max-w-screen-lg mx-auto">
          <Image
            width={194}
            height={32}
            src="/prada.png"
            alt="prada-logo"
            className="mx-auto w-[128px] h-[22px] lg:w-[194px] lg:h-[32px]"
          />
          <Image
            width={206}
            height={34}
            src="/calvin.png"
            alt="calvin-logo"
            className="mx-auto w-[134px] h-[22px] lg:w-[206px] lg:h-[34px]"
          />
        </div>
      </div>
    </>
  );
};

export default Header;
