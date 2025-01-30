import React from "react";
import Image from "next/image";

const DifferentDress = () => {
  return (
    <div className="flex flex-col mt-[70px] w-full mx-10">
      <div className="flex justify-center items-center">
        <h1 className="font-extrabold text-3xl lg:text-5xl text-nowrap">
          BROWSE BY DRESS STYLE
        </h1>
      </div>
      <div className="grid grid-cols-12 gap-4 mt-12 w-full">
        {/* First Image - 4 parts */}
        <div className="col-span-12 md:col-span-4 relative h-[190px] lg:h-[288px] w-full">
          <Image
            src="/casual.png"
            fill // Makes the image fill the parent container
            className="object-cover rounded-[20px]" // Ensures the image covers the container while maintaining aspect ratio
            alt="casual-dress"
            quality={100}
          />
          <div className="absolute inset-y-28 left-4 flex items-center">
            <h1 className="font-extrabold text-2xl">Casual</h1>
          </div>
        </div>

        {/* Second Image - 8 parts */}
        <div className="col-span-12 md:col-span-8 relative h-[190px] lg:h-[288px] w-full">
          <Image
            src="/formal.png"
            fill // Makes the image fill the parent container
            className="object-cover rounded-[20px]" // Ensures the image covers the container while maintaining aspect ratio
            alt="formal-dress"
            quality={100}
          />
          <div className="absolute inset-y-28 left-12 flex items-center">
            <h1 className="font-extrabold text-2xl">Formal</h1>
          </div>
        </div>
      </div>

      {/* part 2 */}

      <div className="grid grid-cols-12 gap-4 mt-12 w-full">
        {/* First Image - 4 parts */}
        <div className="col-span-12 md:col-span-8 relative h-[190px] lg:h-[288px] w-full">
          <Image
            src="/party.png"
            fill // Makes the image fill the parent container
            className="object-cover rounded-[20px]" // Ensures the image covers the container while maintaining aspect ratio
            alt="party-dress"
            quality={100}
          />
          <div className="absolute inset-y-28 left-12 flex items-center">
            <h1 className="font-extrabold text-2xl">Party</h1>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4 relative h-[190px] lg:h-[288px] w-full">
          <Image
            src="/gym.png"
            fill // Makes the image fill the parent container
            className="object-cover rounded-[20px]" // Ensures the image covers the container while maintaining aspect ratio
            alt="gym-dress"
            quality={100}
          />
          <div className="absolute inset-y-28 left-4 flex items-center">
            <h1 className="font-extrabold text-2xl">Gym</h1>
          </div>
        </div>

        {/* Second Image - 8 parts */}
      </div>
    </div>
  );
};

export default DifferentDress;
