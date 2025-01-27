import React from "react";
import Image from "next/image";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import StarIconSvg from "@/components/ui/StarIconSvg";

const ListingProduct = ({ rating = 3.5 }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating); // Number of full stars
    const hasHalfStar = rating % 1 !== 0; // Check if a half star is needed

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        // Full Star
        stars.push(
          <AiFillStar key={i} className="star" color="#ffc107" size={25} />
        );
      } else if (hasHalfStar && i === fullStars) {
        // Half Star with Gradient
        stars.push(
          <StarIconSvg key={i} i={i} />
        );
      }
    }
    return stars;
  };

  return (
    <div className="flex flex-col justify-center items-start w-[296px] h-[298px]">
      <Image
        src="/product/t-shirt1.png"
        alt="t-shirt"
        quality={100}
        width={296}
        height={298}
      />
      <div className="flex flex-col justify-center items-start mt-4">
        <h3 className="font-bold">T-Shirt with Tape Details</h3>
        <div className="flex justify-between items-center space-x-4 mt-2">
          <div className="flex justify-center items-center gap-2">
            {renderStars()}
          </div>
          <p className="text-sm">{rating}/5</p>
        </div>
      </div>
    </div>
  );
};

export default ListingProduct;
