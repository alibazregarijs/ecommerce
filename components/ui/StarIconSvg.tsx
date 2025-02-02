import React from "react";

const StarIconSvg = ({i , empty}: {i: number, empty?: boolean}) => {
  return (
    <div className={`${!empty ? "cursor-pointer" : ""}`}>
      <svg
        key={i}
        width="25"
        height="25"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`gradient-${i}`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="50%" stopColor="#ffc107" />
            <stop offset="50%" stopColor="white" />
          </linearGradient>
        </defs>
        <path
          d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
          fill={`url(#gradient-${i})`}
        />
      </svg>
    </div>
  );
};

export default StarIconSvg;
