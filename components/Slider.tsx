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
    <div className="swiper-container relative">
      {" "}
      {/* Make container relative */}
      <div className="flex absolute top-0 left-0 w-full h-full">
        <h2 className="font-extralight text-lg font-mono">OUR HAPPY CUSTOMERS</h2>
      </div>
      <div className="flex justify-center custom-navigation space-x-2 absolute top-0 right-0  z-10">
        <ArrowLeft
          onClick={handlePrev}
          className="prev-button cursor-pointer" // Add cursor pointer
          size="32"
          color="#000"
        />
        <ArrowRight
          onClick={handleNext} // Corrected to handleNext
          className="next-button cursor-pointer" // Add cursor pointer
          size="32"
          color="#000"
        />
      </div>
      <Swiper
        style={
          {
            "--swiper-pagination-color": "#000",
            "--swiper-pagination-bullet-inactive-color":
              "rgba(29, 28, 28, 0.61)",
            marginTop: "50px", // Adjust top margin as needed
          } as React.CSSProperties
        }
        modules={[Navigation, Pagination, A11y]}
        navigation={false}
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={3}
        ref={swiperRef}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col w-full justify-center p-4 space-y-2 items-start border rounded-[20px]">
              <div className="flex justify-center items-center">
                {renderStars({ rating: slide.rating })}
              </div>
              <div className="flex justify-center items-start space-x-1">
                <p className="font-bold text-md">{slide.name}</p>
                <Image src="/tick.png" alt="tick" width={24} height={24} />
              </div>
              <div>
                <p className="font-mono text-sm text-gray-500">
                  {slide.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
