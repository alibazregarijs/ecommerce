import { configureStore } from '@reduxjs/toolkit'
import { cartSlice } from './CartSlice'

import productReducer from './ProductSlice'
import commentSlice from './CommentSlice'

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartSlice.reducer,
    comments: commentSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
