"use client";
import React from "react";
import Image from "next/image";

const ProductDetail = () => {
  return (
    <section>
      <div className="grid mx-16 md:grid-cols-12 gap-2 grid-cols-1 md:grid-rows-3 md:gap-4">
        <div className="md:col-span-2 col-span-12 space-y-3 md:md:order-1 order-2">
          <div>
            <Image
              src="/product/shirt1.png"
              alt="shirt"
              className="w-[152px] h-[168px]"
              width={152}
              height={168}
              quality={100}
            />
          </div>
          <div>
            <Image
              src="/product/shirt2.png"
              alt="shirt"
              className="w-[152px] h-[168px]"
              width={152}
              height={168}
              quality={100}
            />
          </div>
          <div>
            <Image
              src="/product/shirt3.png"
              alt="shirt"
              className="w-[152px] h-[168px]"
              width={152}
              height={168}
              quality={100}
            />
          </div>
        </div>
        <div className="md:col-span-4 col-span-12 md:md:order-2 order-1 ">
          <Image
            src="/product/big-shirt.png"
            className="w-[440px] h-[530px]"
            alt="shirt"
            width={440}
            height={530}
            quality={100}
          />
        </div>
        <div className="md:col-span-6 col-span-12 md:order-3 order-3">
          Right Div
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
