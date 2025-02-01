import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { type ProductProps } from "@/type";

interface ProductState {
  mainProducts: ProductProps[]; // For the main products
  relatedProducts: ProductProps[]; // For the related products
  mainProductsLoading: boolean; // Loading state for main products
  relatedProductsLoading: boolean; // Loading state for related products
  error: string | null;
}

const initialState: ProductState = {
  mainProducts: [],
  relatedProducts: [],
  mainProductsLoading: false,
  relatedProductsLoading: false,
  error: null,
};

// Async thunk to fetch main products
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    console.log("Fetching products from API...");
    const response = await axios.get<ProductProps[]>("/api/product/all");
    console.log(response.data, "Products fetched from API");
    return response.data;
  }
);

// Async thunk to fetch related products
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
        state.mainProductsLoading = true; // Set loading state for main products
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<ProductProps[]>) => {
          state.mainProductsLoading = false; // Reset loading state for main products
          state.mainProducts = action.payload; // Store main products
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.mainProductsLoading = false; // Reset loading state for main products
        state.error = action.error.message || "Failed to fetch products";
      })

      // Fetch Related Products
      .addCase(fetchRelatedProducts.pending, (state) => {
        state.relatedProductsLoading = true; // Set loading state for related products
        state.error = null;
      })
      .addCase(
        fetchRelatedProducts.fulfilled,
        (state, action: PayloadAction<ProductProps[]>) => {
          state.relatedProductsLoading = false; // Reset loading state for related products
          state.relatedProducts = action.payload; // Store related products
        }
      )
      .addCase(fetchRelatedProducts.rejected, (state, action) => {
        state.relatedProductsLoading = false; // Reset loading state for related products
        state.error = action.error.message || "Failed to fetch related products";
      });
  },
});

export default productsSlice.reducer;