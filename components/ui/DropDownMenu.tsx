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
import AddCommentModal from "@/components/AddCommentModal";

const DropDownMenu = ({
  option,
  setOption,
  comment = true,
  commentObject,
  userId,
  productId,
}: {
  option: string;
  setOption: React.Dispatch<React.SetStateAction<string>>;
  comment?: boolean;
  commentObject?: any;
  userId?: number;
  productId?: number;
}) => {
  const [commentOption, setCommentOption] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false); // Control modal visibility

  // Handle selection and modal opening
  const handleSelect = (value: string) => {
    setOption(value);
    setCommentOption(false); // Close dropdown
    if (value === "edit") {
      setEditModalOpen(true); // Open modal on "Edit"
    }
  };

  console.log(commentObject, "commentObject in dropdwon");


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
          <DropdownMenuRadioGroup value={option} onValueChange={handleSelect}>
            <DropdownMenuRadioItem
              value="edit"
              className="cursor-pointer bg-white text-black hover:!bg-white hover:!text-black"
            >
              Edit
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="Delete"
              className="cursor-pointer bg-red-500 text-white hover:!bg-red-500"
            >
              Delete
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Open modal only when "Edit" is selected */}
      {isEditModalOpen && (
        <AddCommentModal edit={true} setEdit={setEditModalOpen} commentObject={commentObject} userId={userId} productId={productId} />
      )}
    </div>
  );
};

export default memo(DropDownMenu);
