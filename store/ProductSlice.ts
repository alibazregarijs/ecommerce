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
    console.log("fetching products")
    const response = await axios.get<ProductProps[]>("/api/product/all");
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

// Async thunk to update product rating
export const updateProductRating = createAsyncThunk(
  "product/updateProductRating",
  async ({
    productId,
    rating,
    userId,
  }: {
    productId: number;
    rating: number;
    userId: number;
  }) => {
    await axios.put(`/api/product/update/${productId}`, {
      productId,
      rating,
      userId,
    });
    const response = await axios.get<ProductProps>(`/api/product/${productId}`);

    return response.data; // Return updated product data
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
        state.error =
          action.error.message || "Failed to fetch related products";
      })

      // Update Product Rating
      .addCase(updateProductRating.pending, (state) => {
        state.error = null; // Reset error state on rating update
      })
      .addCase(updateProductRating.fulfilled, (state, action) => {
        const updatedProduct = action.payload; // The updated product from the API
      
        // Update in mainProducts
        state.mainProducts = state.mainProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        );
      
        // Update in relatedProducts
        state.relatedProducts = state.relatedProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        );
      })
      .addCase(updateProductRating.rejected, (state, action) => {
        state.error = action.error.message || "Failed to update rating"; // Set error if rating update fails
      });
  },
});

export default productsSlice.reducer;
