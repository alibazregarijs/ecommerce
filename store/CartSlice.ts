import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type CartItem = {
  id: string
  title: string
  price: number
  quantity: number
  img: string
  slug: string
  quantityInStore: number
  size: string
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
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => 
          item.id === action.payload.id &&
          item.size === action.payload.size
      );

      if (existingItem) {
        const totalQuantity = existingItem.quantity + action.payload.quantity;
        
        if (totalQuantity > existingItem.quantityInStore) {
          // Prevent exceeding stock quantity
          existingItem.quantity = existingItem.quantityInStore;
        } else {
          existingItem.quantity = totalQuantity;
        }
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
    },

    removeFromCart: (state, action: PayloadAction<{ id: string; size: string;}>) => {
      const itemIndex = state.items.findIndex(
        (item) => 
          item.id === action.payload.id &&
          item.size === action.payload.size
      );

      if (itemIndex !== -1) {
        if (state.items[itemIndex].quantity === 1) {
          state.items.splice(itemIndex, 1);
        } else {
          state.items[itemIndex].quantity--;
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
