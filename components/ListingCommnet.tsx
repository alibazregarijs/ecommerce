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
}: {
  userId: number;
  productId: number;
}) => {
  const dispatch = useCommentDispatch();
  const comments = useCommentSelector((state) => state.comments.comments);
  const [page, setPage] = useState(1);
  const fetchLoading = useCommentSelector((state) => state.comments.loading); // Track initial fetching
  const modifiedComments = comments.slice(0, page * 4);

  useEffect(() => {
    dispatch(fetchComments({ productId, userId }));
  }, [dispatch, userId, productId]); // Ensure productId is also in dependencies

  if (fetchLoading) return <Spinner loading={true} />; // Show spinner only on first load

  return (
    <>
      <div className="grid grid-cols-12 gap-2 mx-4 md:mx-16 mt-8">
        {comments &&
          modifiedComments.map((comment, index) => (
            <Comment
              comment={comment}
              productId={productId}
              key={index}
              userId={userId}
            />
          ))}
      </div>
      {modifiedComments.length !== comments.length && (
        <div className="flex justify-center items-center md:mx-16 mt-8">
          <Button
            disabled={modifiedComments.length == comments.length}
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-black text-white hover:bg-white hover:text-black"
          >
            Load More
          </Button>
        </div>
      )}
    </>
  );
};

export default ListingComment;
