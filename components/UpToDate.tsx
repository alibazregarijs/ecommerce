import React from "react";
import { Button } from "./ui/button";
import { Sms } from "iconsax-react";

const UpToDate = () => {
  return (
    <div className="flex justify-center items-center mt-[80px] w-full mx-[68px] max-w-screen-xl">
      <div className="flex justify-center items-center bg-black rounded-[20px] py-8 w-full">
        <div className="flex justify-around items-center w-full">
          <div className="flex justify-center items-center w-[500px]">
            <h1 className="font-extrabold text-4xl leading-none text-white">
              STAY UPTO DATE ABOUT OUR LATEST OFFERS
            </h1>
          </div>
          <div className="flex flex-col justify-center items-center space-y-4">
            <Button className="bg-white text-black rounded-[20px] hover:bg-white hover:text-black">
            <Sms size="32" color="#000"/>Enter your email address</Button>
            <Button className="bg-white text-black rounded-[20px] hover:bg-white hover:text-black">Subscribe to our newsletter</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpToDate;
