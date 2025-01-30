import React from "react";
import { Button } from "./ui/button";
import { Sms } from "iconsax-react";

const UpToDate = () => {
  return (
    <div className="flex justify-center items-center mt-[80px] w-full px-10">
      <div className="flex justify-center items-center bg-black rounded-[20px] py-8 w-full">
        <div className="flex justify-center items-center w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 px-5 w-full max-w-6xl items-center">
            {/* Text Section */}
            <div className="flex justify-center md:justify-start items-center max-w-[500px] text-center md:text-left mx-4">
              <h1 className="font-extrabold text-4xl leading-[46px] text-white">
                STAY UPTO DATE ABOUT OUR LATEST OFFERS
              </h1>
            </div>

            {/* Button Section */}
            <div className="flex md:mt-0 mt-8  flex-col justify-center items-center w-full px-4 space-y-4 mx-4">
              <Button className="bg-white text-black rounded-[20px] hover:bg-white hover:text-black w-full">
                <Sms size="32" color="#000" /> Enter your email address
              </Button>
              <Button className="bg-white text-black rounded-[20px] hover:bg-white hover:text-black w-full">
                Subscribe to our newsletter
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpToDate;
