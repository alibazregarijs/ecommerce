import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "api/cart/add"; // Adjust based on your backend

// Define the CartItem type
export type CartItem = {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  quantityInStore: number;
  size: string;
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
  };
};
// Define the CartState type
type CartState = {
  items: CartItem[];
  loading: boolean;
  error: string | null;
};

// Initial state
const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

// ** Fetch all cart items for a specific user **
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/cart/${userId}`);

      console.log(response.data.totalPrice, "totalPrice");
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
        quantity: 1, // Always increment by 1
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

// ** Remove a cart item **
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (
    {
      userId,
      productId,
      size,
    }: { userId: string; productId: number; size: string },
    { rejectWithValue }
  ) => {
    console.log("okkkk");
    console.log(productId, "product in slice");
    try {
      const updatedCart = await axios.put(`/api/cart/update/${userId}`, {
        productId,
        size,
      });
      return updatedCart.data;
    } catch (error) {
      if (error instanceof Error) {
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
      await axios.delete(`${API_BASE_URL}/${userId}`);
      return [];
    } catch (error) {
      if (error instanceof Error)
        return rejectWithValue(error.message || "Failed to clear cart");
    }
  }
);

// Create Redux Slice
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
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

      // Add to Cart
      .addCase(
        addCartItem.fulfilled,
        (state, action: PayloadAction<CartItem>) => {
          const existingItem = state.items.find(
            (item) =>
              item.id === action.payload.id && item.size === action.payload.size
          );

          if (existingItem) {
            console.log("1")
            const totalQuantity = action.payload.quantity;

            if (totalQuantity > existingItem.quantityInStore) {
              console.log("2")
              existingItem.quantity = existingItem.quantityInStore;
            } else {
                console.log("3")
              existingItem.quantity = totalQuantity;
            }
          } else {
            console.log("4")
            state.items.push({
              ...action.payload,
              quantity: action.payload.quantity || 1,
            });
          }
        }
      )

      // update from Cart
      // Update Cart Item
      .addCase(
        updateCartItem.fulfilled,
        (
          state,
          action: PayloadAction<
            { productId: string; size: string; quantity: number } | undefined
          >
        ) => {
          const payload = action.payload;
          if (!payload) return; // Ensure payload exists before updating state

          const existingItem = state.items.find(
            (item) =>
              item.productId === Number(payload.productId) &&
              item.size === payload.size
          );

          if (existingItem) {
            existingItem.quantity = payload.quantity;
          }
        }
      )

      // Clear Cart
      .addCase(clearCartThunk.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export default cartSlice.reducer;
