import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define the Comment type
interface Comment {
  id: number;
  name: string;
  productId: number;
  rating?: number;
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

export const rateComment = createAsyncThunk(
  "comment/rateComment",
  async (
    {
      userId,
      commentId,
      rating,
    }: {
      userId: number;
      commentId: number;
      rating: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(`/api/comment/rate`, {
        userId,
        commentId,
        rating,
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to rate comment");
      }
    }
  }
);

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

      return response.data; // Return the newly created comment
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to create comment");
      }
    }
  }
);

export const fetchComments = createAsyncThunk(
  "comment/fetchComments",
  async (
    { productId, userId }: { productId: number; userId: number },
    { rejectWithValue }
  ) => {

    try {
      const response = await axios.get(`/api/comment/${userId}/${productId}`);
   
      return response.data; // Ensure the response is an array
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to fetch comments");
      }
    }
  }
);

export const updateComment = createAsyncThunk(
  "comment/createComment",
  async (
    {
      userId,
      commentId,
      content,
    }: {
      userId: number;
      commentId: number;
      content: string;
    },
    { rejectWithValue } 
  ) => {
    try {
      console.log(userId, commentId, content, "commentId");
      const response = await axios.put("/api/comment/content", {
        userId,
        commentId,
        content,
      });

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
        name: string;
        productId: number;
        content: string;
      }>
    ) => {
      const { tempId, name, productId, content } = action.payload;

      state.pendingComments[tempId] = true; // Mark comment as pending

      state.comments.unshift({ // Add new comment at the beginning of the array
        id: tempId, // Temporary ID until backend assigns real one
        name,
        productId,
        content,
        createdAt: new Date().toISOString(),
      });
    },

    rateCommentOptimistically: (
      state,
      action: PayloadAction<{
        productId: number;
        commentId: number;
        rating: number;
      }>
    ) => {
      const { productId, commentId, rating } = action.payload;

      // Find the comment in the state
      const commentIndex = state.comments.findIndex(
        (comment) => comment.id === commentId && comment.productId === productId
      );

      if (commentIndex !== -1) {
        const updatedComment = {
          ...state.comments[commentIndex],
          rating: rating,
        };

        state.comments[commentIndex] = updatedComment;
      }
    },

    updateCommentOptimistically: (
      state,
      action: PayloadAction<{
        commentId: number;
        content: string;
      }>
    ) => {
      const { commentId, content } = action.payload;

      // Find the comment in the state
      const commentIndex = state.comments.findIndex(
        (comment) => comment.id === commentId
      );

      if (commentIndex !== -1) {
        const updatedComment = {
          ...state.comments[commentIndex],
          content,
        };

        state.comments[commentIndex] = updatedComment;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Comment
      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.loading = false;
          state.comments = state.comments.map((comment) =>
            state.pendingComments[comment.id]
              ? {
                  ...comment,
                  id: action.payload.id,
                  createdAt: action.payload.createdAt,
                } // Replace temp comment
              : comment
          );
          delete state.pendingComments[action.payload.id]; // Remove pending flag
        }
      )
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.loading = false;
          state.comments = action.payload; // Update the state with fetched comments
        }
      )
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Set error message
      });
  },
});

export const { createCommentOptimistically, rateCommentOptimistically , updateCommentOptimistically } =
  commentSlice.actions;
export default commentSlice.reducer;
