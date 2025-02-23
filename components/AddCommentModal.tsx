"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCommentDispatch } from "@/store/hook";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  createComment,
  createCommentOptimistically,
  updateComment,
  updateCommentOptimistically,
} from "@/store/CommentSlice";

const CommentModal = ({
  isAddCommentBtnClicked,
  setAddCommentBtnClicked,
  productId,
  userId,
  username,
  edit,
  setEdit,
  commentObject,
}: {
  isAddCommentBtnClicked?: boolean;
  setAddCommentBtnClicked?: React.Dispatch<React.SetStateAction<boolean>>;
  productId?: number;
  userId?: number;
  username?: string;
  edit?: boolean;
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  commentObject?: any;
}) => {
  const dispatch = useCommentDispatch();
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);

  // Sync `open` state with `isAddCommentBtnClicked` and `edit`
  useEffect(() => {
    setOpen(isAddCommentBtnClicked || edit || false);
  }, [isAddCommentBtnClicked, edit]);

  const handleSubmit = () => {
    if (!userId || !productId) return;

    console.log(edit, "edit 11111111");
    if (comment.trim().length === 0) {
      toast({
        title: "Error",
        description: "Comment cannot be empty",
        variant: "destructive",
        className: "bg-white text-black",
      });
      return;
    }

    if (!edit) {
      console.log(edit, "edit");
      dispatch(
        createCommentOptimistically({
          tempId: Math.floor(Math.random() * 10000),
          name: username!,
          productId,
          content: comment,
        })
      );

      dispatch(createComment({ userId, productId, content: comment }));

      toast({
        title: "Comment submitted",
        description: "Your comment has been successfully submitted.",
      });

      setComment("");
      closeModal(); // Properly close modal
    } else {
      console.log("here")
      dispatch(updateCommentOptimistically({ commentId: commentObject.id, content: comment }));
      dispatch(updateComment({ userId, commentId: commentObject.id, content: comment }));
      toast({
        title: "Comment updated",
        description: "Your comment has been successfully updated.",
      });
      setComment("");
      closeModal(); // Properly close modal
    }
  };

  const closeModal = () => {
    setOpen(false);
    if (setAddCommentBtnClicked) setAddCommentBtnClicked(false);
    if (setEdit) setEdit(false);
  };

  return (
    <Dialog open={open} onOpenChange={(state) => !state && closeModal()}>
      <DialogContent className="sm:max-w-[425px] bg-gray-200 text-black">
        <DialogHeader className="border">
          <DialogTitle>{edit ? "Edit Comment" : "Add a Comment"}</DialogTitle>
          <DialogDescription>
            {edit
              ? "Modify your comment below. Click submit when done."
              : "Write your comment below. Click submit when you're done."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="Write your comment here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="resize-none"
            rows={5}
          />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            {edit ? "Save Changes" : "Submit Comment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CommentModal;
