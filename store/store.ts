import { configureStore } from '@reduxjs/toolkit'
import { cartSlice } from './CartSlice'

import productReducer from './ProductSlice'

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
