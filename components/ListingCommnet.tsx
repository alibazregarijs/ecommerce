"use client";
import React, { useEffect, useState } from "react";
import Comment from "@/components/Comment";
import { useCommentSelector, useCommentDispatch } from "@/store/hook";
import { fetchComments } from "@/store/CommentSlice";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";

const ListingComment = ({
  userId,
  productId,
  fetchLoading,
  comments,
}: {
  userId: number;
  productId: number;
  fetchLoading: boolean;
  comments: any;
}) => {
 

  if (fetchLoading) return <Spinner loading={true} />; // Show spinner only on first load

  return (
    <>
      <div className="grid grid-cols-12 gap-2 mx-4 md:mx-16 mt-8">
        {comments &&
          comments.map((comment:any, index:any) => (
            <Comment
              comment={comment}
              productId={productId}
              key={index}
              userId={userId}
            />
          ))}
      </div>
    
    </>
  );
};

export default ListingComment;
