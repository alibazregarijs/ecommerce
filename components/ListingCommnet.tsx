"use client";
import React from "react";
import Comment from "@/components/Comment";

const ListingComment = () => {
  return (
    <div className="grid grid-cols-12 gap-2 mx-4 md:mx-16 mt-8">
      {Array(4)
        .fill(null)
        .map((_, index) => (
          <Comment key={index} />
        ))}
    </div>
  );
};

export default ListingComment;
