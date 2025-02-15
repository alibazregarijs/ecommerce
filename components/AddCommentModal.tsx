"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

const CommentModal = ({isAddCommentBtnClicked, setAddCommentBtnClicked}:{isAddCommentBtnClicked:boolean, setAddCommentBtnClicked:React.Dispatch<React.SetStateAction<boolean>>}) => {
  const [comment, setComment] = useState("")
  const [open, setOpen] = useState(false)

  const handleSubmit = () => {
    if (comment.trim().length === 0) {
      toast({
        title: "Error",
        description: "Comment cannot be empty",
        variant: "destructive",
        className: "bg-white text-black",
      })
      return
    }

    // Here you would typically send the comment to your backend
    console.log("Submitting comment:", comment)

    toast({
      title: "Comment submitted",
      description: "Your comment has been successfully submitted.",
    })

    setComment("")
    setOpen(false)
  }

  return (
    <Dialog open={isAddCommentBtnClicked} onOpenChange={setAddCommentBtnClicked}>
      
      <DialogContent className="sm:max-w-[425px] bg-gray-200 text-black">
        <DialogHeader className="border">
          <DialogTitle>Add a Comment</DialogTitle>
          <DialogDescription>Write your comment below. Click submit when you're done.</DialogDescription>
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
          <Button type="submit" onClick={handleSubmit}>
            Submit Comment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CommentModal

