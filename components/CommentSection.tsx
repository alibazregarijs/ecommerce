"use client";
import React, { useState, useCallback, useEffect } from "react";
import { Button } from "./ui/button";
import DropDownMenu from "@/components/ui/DropDownMenu";
import ListingCommnet from "@/components/ListingCommnet";
import AddCommentModal from "@/components/AddCommentModal";
import { useCommentDispatch, useCommentSelector } from "@/store/hook";
import { fetchComments } from "@/store/CommentSlice";

const CommentSection = ({
  productId,
  userId,
  username,
}: {
  productId: number;
  userId: number;
  username: string;
}) => {
  const [filter, setFilter] = useState("newest");
  const [activeTab, setActiveTab] = useState("reviews");
  const [isAddCommentBtnClicked, setAddCommentBtnClicked] = useState(false);

  const dispatch = useCommentDispatch();
  const comments = useCommentSelector((state) => state.comments.comments);
  const [page, setPage] = useState(1);
  const fetchLoading = useCommentSelector((state) => state.comments.loading); // Track initial fetching
  const modifiedComments = comments.slice(0, page * 4);

  let newest = filter === "newest" ? true : false;

  useEffect(() => {
    dispatch(fetchComments({ productId, userId, newest: newest }));
  }, [dispatch, userId, productId, newest]); // Ensure productId is also in dependencies

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="flex px-4 md:px-16 mt-20 justify-around items-center w-full rounded-t-[20px] bg-white border-b-1 border-gray-200">
        {["detail", "reviews", "FAQs"].map((tab) => (
          <div
            key={tab}
            className={`flex items-center justify-center w-1/2 h-full ${
              activeTab === tab
                ? "border-b-2 border-black"
                : "border-b-2 border-gray-200"
            }`}
            onClick={() => handleTabClick(tab)}
          >
            <h1
              className={`font-bold text-[16px] pb-2 cursor-pointer ${
                activeTab === tab ? "text-black" : "text-gray-400"
              }`}
            >
              {tab === "detail"
                ? "Product Details"
                : tab === "reviews"
                ? "Rating & Reviews"
                : "FAQs"}
            </h1>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4 px-4 md:px-16">
        <div>
          <h1 className="font-bold text-base">All Reviews</h1>
        </div>
        <div className="flex items-center space-x-2">
          <div>
            <DropDownMenu
              option={filter}
              setOption={setFilter}
              comment={false}
              userId={userId}
              productId={productId}
            />
          </div>
          <Button
            onClick={() => setAddCommentBtnClicked((prev) => !prev)}
            className="bg-black text-white hover:bg-gray-200 hover:text-black px-4 py-2"
          >
            Write a Review
          </Button>
        </div>
      </div>

      {/* Listing Comment */}
      <ListingCommnet
        userId={userId}
        productId={productId}
        comments={modifiedComments}
        fetchLoading={fetchLoading}
      />

      {/* Adding  Comment  */}
      {isAddCommentBtnClicked && (
        <AddCommentModal
          isAddCommentBtnClicked={isAddCommentBtnClicked}
          setAddCommentBtnClicked={setAddCommentBtnClicked}
          productId={productId}
          userId={userId}
          username={username}
        />
      )}
      {/* Load More Button */}
      {modifiedComments.length !== comments.length && (
        <div className="flex justify-center items-center md:mx-16 mt-8">
          <Button
            disabled={modifiedComments.length == comments.length}
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-black text-white hover:!bg-black"
          >
            Load More
          </Button>
        </div>
      )}
    </>
  );
};

export default React.memo(CommentSection);
