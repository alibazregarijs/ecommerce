"use client";
import React from "react";
import Comment from "@/components/Comment";
import { useCommentSelector } from "@/store/hook";


const ListingComment = () => {
  const comments = useCommentSelector((state) => state.comments.comments);
  console.log(comments,"reducer comment");
  return (
    <div className="grid grid-cols-12 gap-2 mx-4 md:mx-16 mt-8">
      {comments &&
        comments.map((comment, index) => (
          <Comment comment={comment} key={index} />
        ))}
    </div>
  );
};

export default ListingComment;
