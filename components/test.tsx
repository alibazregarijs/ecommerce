import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 justify-center items-start mt-[80px] mx-10">
      {/* SHOP.CO Section - Full width */}
      <div className="flex flex-col justify-center items-start space-y-4 w-full col-span-2 md:col-span-5">
        <h1 className="font-bold text-2xl">SHOP.CO</h1>
        <p className="font-mono text-sm text-gray-500">
          We have clothes that suit your style and which you’re proud to wear.
          From women to men.
        </p>
        <Image src="/social.png" alt="social" width={130} height={130} />
      </div>

      {/* COMPANY Section */}
      <div className="flex flex-col justify-center items-start space-y-4 w-full">
        <h3 className="font-extralight text-xl">COMPANY</h3>
        <p className="font-mono text-sm text-gray-500">About</p>
        <p className="font-mono text-sm text-gray-500">Features</p>
        <p className="font-mono text-sm text-gray-500">Works</p>
        <p className="font-mono text-sm text-gray-500">Career</p>
      </div>

      {/* HELP Section */}
      <div className="flex flex-col justify-center items-start space-y-4 w-full">
        <h3 className="font-extralight text-xl">HELP</h3>
        <p className="font-mono text-sm text-gray-500">Customer Support</p>
        <p className="font-mono text-sm text-gray-500">Delivery Details</p>
        <p className="font-mono text-sm text-gray-500">Terms & Conditions</p>
        <p className="font-mono text-sm text-gray-500">Privacy Policy</p>
      </div>

      {/* RESOURCES Section */}
      <div className="flex flex-col justify-center items-start space-y-4 w-full">
        <h3 className="font-extralight text-xl">RESOURCES</h3>
        <p className="font-mono text-sm text-gray-500">Free eBooks</p>
        <p className="font-mono text-sm text-gray-500">Development Tutorial</p>
        <p className="font-mono text-sm text-gray-500">How to - Blog</p>
        <p className="font-mono text-sm text-gray-500">YouTube Playlist</p>
      </div>

      {/* FAQ Section */}
      <div className="flex flex-col justify-center items-start space-y-4 w-full">
        <h3 className="font-extralight text-xl">FAQ</h3>
        <p className="font-mono text-sm text-gray-500">Account</p>
        <p className="font-mono text-sm text-gray-500">Manage Deliveries</p>
        <p className="font-mono text-sm text-gray-500">Orders</p>
        <p className="font-mono text-sm text-gray-500">Payments</p>
      </div>
    </div>
  );
};

export default Footer;
