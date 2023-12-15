// cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../interfaces";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increaseItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.sku === action.payload);
      if (item) {
        item.count += 1;
        return;
      }

      state.items.push({ sku: action.payload, count: 1 });
    },
    decreaseItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.sku === action.payload);
      if (item) {
        item.count -= 1;
      }

      state.items = state.items.filter((item) => item.count > 0);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { increaseItem, decreaseItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
