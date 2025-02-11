import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type CartItem = {
  id: string
  title: string
  price: number
  quantity: number
  img: string
  slug: string
  quantityInStore: number
}

type CartState = {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1; // Add proper quantity
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
    },
    
    removeFromCart(state, action: PayloadAction<string>) {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      )
    
      if (state.items[itemIndex].quantity === 1) {
        state.items.splice(itemIndex, 1)
      } else {
        state.items[itemIndex].quantity--
      }
    },
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions

export default cartSlice.reducer