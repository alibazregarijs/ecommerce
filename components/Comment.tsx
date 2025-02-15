"use client";
import { renderStars } from "@/lib/utils";
import Image from "next/image";
import { useState , memo } from "react";
import DropDownMenu from "@/components/ui/DropDownMenu";

const Comment = () => {
  const [updateComment, setUpdateComment] = useState("");
  console.log(updateComment,"updateComment")
  

  return (
    <div className="col-span-6 border rounded-[20px] p-5 flex flex-col space-y-4">
      <div className="flex justify-between w-full items-center">
        <div className="flex justify-center items-center">
          {renderStars({ rating: 4, onClick: () => {}, empty: true })}
        </div>

        <DropDownMenu
          option={updateComment}
          setOption={setUpdateComment}
          comment={true}
      
        />
      </div>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-base">Jon Doe</h1>
        <Image src="/tick.png" alt="tick" width={20} height={20} />
      </div>
      <p className="text-sm text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
        voluptatem voluptas? Numquam, labore. Ullam excepturi ab incidunt unde
        molestiae debitis.
      </p>
    </div>
  );
};



export default memo(Comment);
