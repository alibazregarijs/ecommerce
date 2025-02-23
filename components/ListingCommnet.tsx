"use client";
import React, { useEffect } from "react";
import Comment from "@/components/Comment";
import { useCommentSelector, useCommentDispatch } from "@/store/hook";
import { fetchComments } from "@/store/CommentSlice";
import Spinner from "@/components/Spinner";

const ListingComment = ({
  userId,
  productId,
}: {
  userId: number;
  productId: number;
}) => {
  const dispatch = useCommentDispatch();
  const comments = useCommentSelector((state) => state.comments.comments);
  const fetchLoading = useCommentSelector(
    (state) => state.comments.loading
  ); // Track initial fetching

  useEffect(() => {
    dispatch(fetchComments({ productId, userId }));
  }, [dispatch, userId, productId]); // Ensure productId is also in dependencies

  if (fetchLoading) return <Spinner loading={true} />; // Show spinner only on first load

  return (
    <div className="grid grid-cols-12 gap-2 mx-4 md:mx-16 mt-8">
      {comments &&
        comments.map((comment, index) => (
          <Comment
            comment={comment}
            productId={productId}
            key={index}
            userId={userId}
          />
        ))}
    </div>
  );
};

export default ListingComment;
