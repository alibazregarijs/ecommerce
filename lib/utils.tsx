import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AiFillStar } from "react-icons/ai";
import StarIconSvg from "@/components/ui/StarIconSvg";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const renderStars = ({rating}:{rating:number}) => {

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
      stars.push(<StarIconSvg key={i} i={i} />);
    }
  }
  return stars;
};
