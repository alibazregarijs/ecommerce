"use client";
import { renderStars } from "@/lib/utils";
import Image from "next/image";
import { useState, memo } from "react";
import DropDownMenu from "@/components/ui/DropDownMenu";

const Comment = ({comment}:{comment:any}) => {
  const [updateComment, setUpdateComment] = useState("");
  const rating = comment.ratingId?.rating || 0;

  return (
    <div className="col-span-6 border rounded-[20px] p-5 flex flex-col space-y-4">
      <div className="flex justify-between w-full items-center">
        <div className="flex justify-center items-center">
          {renderStars({ rating: rating, onClick: () => {}, empty: true })}
        </div>

        <DropDownMenu
          option={updateComment}
          setOption={setUpdateComment}
          comment={true}
        />
      </div>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-base">{comment.userId.name}</h1>
        <Image src="/tick.png" alt="tick" width={20} height={20} />
      </div>
      <p className="text-sm text-gray-500">
        {comment.content}
      </p>
    </div>
  );
};

export default memo(Comment);
