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
  empty, // Add a full prop to render full stars
}: {
  rating: number;
  onClick: (rating: number) => void; // Callback to handle the rating click
  empty?: boolean; // Optional prop to render full stars
}) => {
  const stars = [];
  const fullStars = Math.floor(rating); // Number of full stars
  const hasHalfStar = rating % 1 !== 0; // Check if a half star is needed

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      // Full Star
      stars.push(
        <AiFillStar
          onClick={empty ? () => {} : () => onClick(i + 1)} // Rating should be 1-based (i + 1)
          key={i}
          className={`star ${!empty ? "cursor-pointer" : ""}`}
          color="#ffc107"
          size={25}
        />
      );
    } else if (hasHalfStar && i === fullStars) {
      // Half Star with Gradient (if needed)
      stars.push(<StarIconSvg key={i} i={i} empty={empty} />);
    } else {
      // Empty Star
      stars.push(
        <AiOutlineStar
          onClick={empty ? () => {} : () => onClick(i + 1)} // Rating should be 1-based (i + 1)
          key={i}
          className={`star ${!empty ? "cursor-pointer" : ""}`}
          color="#ffc107"
          size={25}
        />
      );
    }
  }
  return stars;
};

export function timeAgo(timestamp: string): string {
  const now = new Date(); // Current time
  const past = new Date(timestamp); // Convert the input timestamp to a Date object

  // Calculate the difference in milliseconds
  const diffInMs = now.getTime() - past.getTime();

  // Convert milliseconds to seconds, minutes, hours, days, etc.
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  // Determine the appropriate time ago string
  if (diffInYears > 0) {
    return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
  } else if (diffInMonths > 0) {
    return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  } else if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  } else if (diffInHours > 0) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  } else {
    return `${diffInSeconds} second${diffInSeconds > 1 ? "s" : ""} ago`;
  }
}
