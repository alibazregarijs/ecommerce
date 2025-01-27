import React from "react";
import Image from "next/image";

const DifferentDress = () => {
  return (
    <div className="flex flex-col mt-[70px] w-full">
      <div className="flex justify-center items-center">
        <h1 className="font-extrabold text-5xl">BROWSE BY DRESS STYLE</h1>
      </div>
      <div className="flex justify-center  space-x-5 mt-16 w-full">
        <div className="flex relative">
          <Image
            src="/casual.png"
            className="rounded-[20px]"
            width={408}
            height={288}
            alt="casual-dress"
            quality={100}
          />
          <div className="absolute inset-y-28 top-0 left-4 flex items-center">
            <h1 className="font-extrabold text-2xl">Casual</h1>
          </div>
        </div>
        <div className="flex relative">
          <Image
            src="/formal.png"
            className="rounded-[20px]"
            width={684}
            height={288}
            alt="casual-dress"
            quality={100}
          />
          <div className="absolute inset-y-28 top-0 left-4 flex items-center">
            <h1 className="font-extrabold text-2xl">Formal</h1>
          </div>
        </div>
      </div>
      {/* 2 */}
      <div className="flex justify-center  space-x-5 mt-5 w-full">
        <div className="flex relative ">
          <Image
            src="/party.png"
            className="rounded-[20px]"
            width={684}
            height={288}
            alt="party-dress"
            quality={100}
          />
          <div className="absolute inset-y-28 top-0 left-4 flex items-center">
            <h1 className="font-extrabold text-2xl">party</h1>
          </div>
        </div>
        <div className="flex relative">
          <Image
            src="/gym.png"
            className="rounded-[20px]"
            width={408}
            height={288}
            alt="gym-dress"
            quality={100}
          />
          <div className="absolute inset-y-28 top-0 left-4 flex items-center">
            <h1 className="font-extrabold text-2xl">gym</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DifferentDress;
