import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { type ProductProps } from "@/type";
import { auth } from "@/auth";

interface ProductState {
  mainProducts: ProductProps[]; // For the main products
  relatedProducts: ProductProps[]; // For the related products
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductState = {
  mainProducts: [],
  relatedProducts: [],
  status: "idle",
  error: null,
};


// Async thunk to fetch todos
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    console.log("Fetching products from API...");
    const response = await axios.get<ProductProps[]>("/api/product/all");
    console.log(response.data, "Products fetched from API");
    return response.data;
  }
);

export const fetchRelatedProducts = createAsyncThunk(
  "product/fetchRelatedProducts",
  async (userId: number) => {
   
    const relatedProducts = await axios.post<ProductProps[]>(
      "/api/product/related",
      { userId, limit: 3 }
    );
    return relatedProducts.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Main Products
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<ProductProps[]>) => {
          state.status = "succeeded";
          state.mainProducts = action.payload; // Store main products
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      })

      // Fetch Related Products
      .addCase(fetchRelatedProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchRelatedProducts.fulfilled,
        (state, action: PayloadAction<ProductProps[]>) => {
          state.status = "succeeded";
          state.relatedProducts = action.payload; // Store related products
        }
      )
      .addCase(fetchRelatedProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch related products";
      });
  },
});

export default productsSlice.reducer;
