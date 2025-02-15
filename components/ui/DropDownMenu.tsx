"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { memo, useState } from "react";

const DropDownMenu = ({
  option,
  setOption,
  comment = true,
}: {
  option: string;
  setOption: React.Dispatch<React.SetStateAction<string>>;
  comment?: boolean;
  commentOption?: boolean;
  setCommentOption?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [commentOption, setCommentOption] = useState(false);

  return (
    <div>
      <DropdownMenu open={commentOption} onOpenChange={setCommentOption}>
        <DropdownMenuTrigger asChild>
          <span>
            {comment ? (
              <Image
                className="cursor-pointer"
                src="/eclipse.png"
                alt="tick"
                width={20}
                height={20}
                onClick={() => setCommentOption?.(!commentOption)}
              />
            ) : (
              <Button variant="outline">
                {option === "newest"
                  ? "Newest"
                  : option === "highest"
                  ? "Highest Rating"
                  : "Lowest Rating"}
              </Button>
            )}
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-black text-white" align="end">
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={option} onValueChange={setOption}>
            <DropdownMenuRadioItem
              value={comment ? "edit" : "newest"}
              className={`cursor-pointer ${
                comment &&
                "bg-white text-black hover:!bg-white hover:!text-black"
              }`}
            >
              {comment ? "Edit" : "New"}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
                value={comment ? "Delete" : "Highest"}
              className={`cursor-pointer ${
                comment && "bg-red-500 text-white hover:!bg-red-500"
              }`}
            >
              {comment ? "Delete" : "Highest Price"}
            </DropdownMenuRadioItem>
            {!comment && (
              <DropdownMenuRadioItem value="lowest" className="cursor-pointer">
                Lowest Rating
              </DropdownMenuRadioItem>
            )}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default memo(DropDownMenu);
