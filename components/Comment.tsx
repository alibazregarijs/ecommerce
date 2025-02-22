"use client";
import { renderStars } from "@/lib/utils";
import Image from "next/image";
import { useState, memo } from "react";
import DropDownMenu from "@/components/ui/DropDownMenu";
import { useCommentDispatch, useCommentSelector } from "@/store/hook";
import { rateComment } from "@/store/CommentSlice";
import { rateCommentOptimistically } from "@/store/CommentSlice";
import { timeAgo } from "@/lib/utils";

const Comment = ({comment,userId , productId}:{comment:any,userId:number,productId:number}) => {
  const [updateComment, setUpdateComment] = useState("");
  const rating = comment.ratingId?.rating || 0;
  const [selectedRating, setSelectedRating] = useState(0); // Track selected rating
  const dispatch = useCommentDispatch();
  const handleStarClick = async (rating: number) => {
      setSelectedRating(rating); // Update the selected rating
      dispatch(rateCommentOptimistically({ productId: productId, commentId: comment.id, rating:rating }))
      const result = await dispatch(
        rateComment({ userId: userId, commentId: comment.id, rating })
      ); // Update the rating
      
    };
  
  console.log(comment.rating,"comment.rating")

  return (
    <div className="col-span-6 border rounded-[20px] p-5 flex flex-col space-y-4">
      <div className="flex justify-between w-full items-center">
        <div className="flex justify-center items-center">
          {renderStars({ rating: comment.rating, onClick: handleStarClick })}
        </div>

        <DropDownMenu
          option={updateComment}
          setOption={setUpdateComment}
          comment={true}
        />
      </div>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-base">{comment.name}</h1>
        <Image src="/tick.png" alt="tick" width={20} height={20} />
      </div>
      <p className="text-sm text-gray-500">
        {comment.content}
      </p>
      <p className="text-sm text-gray-500">
        {timeAgo(comment.createdAt)}
      </p>
    </div>
  );
};

export default memo(Comment);
