import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import StarIconSvg from "@/components/ui/StarIconSvg";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// renderStars function
export const renderStars = ({
  rating,
  onClick, // Add an onClick handler to pass the rating up
}: {
  rating: number;
  onClick: (rating: number) => void; // Callback to handle the rating click
}) => {
  const stars = [];
  const fullStars = Math.floor(rating); // Number of full stars
  const hasHalfStar = rating % 1 !== 0; // Check if a half star is needed

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      // Full Star
      stars.push(
        <AiFillStar
          onClick={() => onClick(i)} // Rating should be 1-based (i + 1)
          key={i}
          className="star cursor-pointer"
          color="#ffc107"
          size={25}
        />
      );
    } else if (hasHalfStar && i === fullStars) {
      // Half Star with Gradient (if needed)
      stars.push(<StarIconSvg key={i} i={i} />);
    } else {
      // Empty Star
      stars.push(
        <AiOutlineStar
          onClick={() => onClick(i+1)} // Rating should be 1-based (i + 1)
          key={i}
          className="star cursor-pointer"
          color="#ffc107"
          size={25}
        />
      );
    }
  }
  return stars;
};
