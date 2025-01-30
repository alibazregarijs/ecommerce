"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import React, { useRef } from "react";
import { ArrowRight } from "iconsax-react";
import { ArrowLeft } from "iconsax-react";
import { renderStars } from "@/lib/utils";
import Image from "next/image";

const Slider = ({ slides }: { slides: any[] }) => {
  const swiperRef = useRef<any>(null);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex justify-between items-center w-full px-10">
        <div className="flex">
          <h2 className="font-extralight text-lg font-mono">
            OUR HAPPY CUSTOMERS
          </h2>
        </div>
        <div className="flex">
          <ArrowLeft
            onClick={handlePrev}
            className="prev-button cursor-pointer"
            size="32"
            color="#000"
          />
          <ArrowRight
            onClick={handleNext}
            className="next-button cursor-pointer"
            size="32"
            color="#000"
          />
        </div>
      </div>

      {/* Swiper wrapper */}
      <div className="w-full px-10">
        <Swiper
          style={{
            "--swiper-pagination-color": "#000",
            "--swiper-pagination-bullet-inactive-color": "rgba(29, 28, 28, 0.61)",
            marginTop: "50px", // Adjust top margin as needed
          } as React.CSSProperties}
          modules={[Navigation, Pagination, A11y]}
          navigation={false}
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1} // Default to 1 slide per view for small screens
          breakpoints={{
            1024: {
              slidesPerView: 3, // 3 slides for large screens
            },
            768: {
              slidesPerView: 2, // 2 slides for medium screens (e.g., tablets)
            },
            0: {
              slidesPerView: 1, // 1 slide for small screens (e.g., mobile)
            },
          }}
          ref={swiperRef}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col justify-between min-h-[240px] h-[240px] p-10 space-y-2 items-start border rounded-[20px] overflow-hidden">
                <div className="flex justify-center items-center">
                  {renderStars({ rating: slide.rating })}
                </div>
                <div className="flex justify-center items-start space-x-1">
                  <p className="font-bold text-md">{slide.name}</p>
                  <Image src="/tick.png" alt="tick" width={24} height={24} />
                </div>
                <div className="">
                  <p className="font-mono text-sm text-wrap text-gray-500">
                    {slide.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
