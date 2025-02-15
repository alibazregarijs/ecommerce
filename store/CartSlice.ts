import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { type CartItem } from "@/type";

// Define the CartState type
type CartState = {
  items: CartItem[];
  loading: boolean;
  error: string | null;
  pendingUpdates: Record<string, boolean>; // Track pending updates
};

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
  pendingUpdates: {}, // Initialize as empty
};
// ** Fetch all cart items for a specific user **
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/cart/${userId}`);
      return response.data.cart; // Ensure the response is an array
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to fetch cart items");
      }
    }
  }
);

// ** Add (or update) a cart item **
export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async (
    {
      userId,
      productId,
      size,
      quantity,
      quantityInStore,
    }: {
      userId: number;
      productId: string;
      size: string;
      quantity: number;
      quantityInStore: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post("/api/cart/add", {
        userId,
        productId,
        size,
        quantity,
        quantityInStore,
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to add cart item");
      }
    }
  }
);

// ** Update cart item (optimistic update) **
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (
    {
      userId,
      productId,
      size,
      quantity,
      quantityInStore,
    }: {
      userId: string;
      productId: number;
      size: string;
      quantity: number;
      quantityInStore: number;
    },
    { rejectWithValue, dispatch }
  ) => {
    const itemKey = `${productId}-${size}`;

    try {
      // Optimistic Update

      dispatch(
        cartSlice.actions.updateCartItemOptimistically({
          productId,
          size,
          quantity,
          quantityInStore,
        })
      );

      // API Call
      const response = await axios.put(`/api/cart/update/`, {
        userId,
        productId,
        size,
        quantity,
      });

      return { updatedItem: response.data }; // Ensure the updated item is returned
    } catch (error) {
      if (error instanceof Error) {
        dispatch(
          cartSlice.actions.revertCartItemUpdate({
            productId,
            size,
            quantity,
          })
        );
        return rejectWithValue(error.message || "Failed to update cart item");
      }
    }
  }
);

// ** Clear the entire cart **
export const clearCartThunk = createAsyncThunk(
  "cart/clearCart",
  async (userId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/cart/clear/${userId}`);
      return [];
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to clear cart");
      }
    }
  }
);

// Create Redux Slice
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Optimistic update
    updateCartItemOptimistically: (
      state,
      action: PayloadAction<{
        productId: number;
        size: string;
        quantity: number;
        quantityInStore: number;
      }>
    ) => {
      const { productId, size, quantity, quantityInStore } = action.payload;
      const itemKey = `${productId}-${size}`;

      // Mark this item as having a pending update
      state.pendingUpdates[itemKey] = true;

      // Find the item in the array
      const itemIndex = state.items.findIndex(
        (item) => item.productId === productId && item.size === size
      );

      if (itemIndex !== -1) {
        // Update the quantity directly in the array
        state.items[itemIndex].quantity = quantity;

        // If the quantity is less than or equal to 0, remove the item from the array
        if (quantity <= 0) {
          state.items.splice(itemIndex, 1);
        }
      }
    },

    revertCartItemUpdate: (
      state,
      action: PayloadAction<{
        productId: number;
        size: string;
        quantity: number;
      }>
    ) => {
      const { productId, size, quantity } = action.payload;
      const itemKey = `${productId}-${size}`;

      // Remove the pending update flag
      delete state.pendingUpdates[itemKey];

      const item = state.items.find(
        (item) => item.productId === productId && item.size === size
      );

      if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i !== item); // Remove without changing array reference
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart Items
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCartItems.fulfilled,
        (state, action: PayloadAction<CartItem[]>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Cart Item
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const { productId, size } = action.meta.arg;
        const itemKey = `${productId}-${size}`;

        // Remove the pending update flag
        delete state.pendingUpdates[itemKey];
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { updateCartItemOptimistically, revertCartItemUpdate } =
  cartSlice.actions;
export default cartSlice.reducer;
