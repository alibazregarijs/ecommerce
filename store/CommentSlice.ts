import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define the Comment type
interface Comment {
  id: number;
  userId: {
    id: number;
    name: string;
  };
  productId: number;
  ratingId?: {
    id: number;
    rating: number;
  };
  likeId?: {
    id: number;
    like: boolean;
  };
  content: string;
  createdAt: string;
}

// Define the CommentState type
type CommentState = {
  comments: Comment[];
  loading: boolean;
  error: string | null;
  pendingComments: Record<number, boolean>; // Track pending comment submissions
};

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
  pendingComments: {},
};

// ** Create a comment (Async Thunk) **
export const createComment = createAsyncThunk(
  "comment/createComment",
  async (
    {
      userId,
      productId,
      content,
    }: {
      userId: number;
      productId: number;
      content: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post("/api/comment/add", {
        userId,
        productId,
        content,
      });
      console.log(response.data,"comment")
      return response.data; // Return the newly created comment
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to create comment");
      }
    }
  }
);

// Create Redux Slice
export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    // Optimistic update before API call completes
    createCommentOptimistically: (
      state,
      action: PayloadAction<{
        tempId: number;
        userId: { id: number; name: string };
        productId: number;
        content: string;
      }>
    ) => {
      const { tempId, userId, productId, content } = action.payload;

      state.pendingComments[tempId] = true; // Mark comment as pending

      state.comments.push({
        id: tempId, // Temporary ID until backend assigns real one
        userId,
        productId,
        content,
        createdAt: new Date().toISOString(),
      });
      console.log(state.comments,"reducer comment")
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Comment
      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action: PayloadAction<Comment>) => {
        state.loading = false;
        state.comments = state.comments.map((comment) =>
          state.pendingComments[comment.id]
            ? { ...comment, id: action.payload.id, createdAt: action.payload.createdAt } // Replace temp comment
            : comment
        );
        delete state.pendingComments[action.payload.id]; // Remove pending flag
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { createCommentOptimistically } = commentSlice.actions;
export default commentSlice.reducer;
