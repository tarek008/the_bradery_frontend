import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        state.items[existingIndex] = {
          ...state.items[existingIndex],
          quantity: state.items[existingIndex].quantity + 1,
        };
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.items[existingIndex].quantity === 1) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.items[existingIndex] = {
          ...state.items[existingIndex],
          quantity: state.items[existingIndex].quantity - 1,
        };
      }
    },
    emptyCart: (state) => {
      state.items = [];
    },
    updateItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, emptyCart, updateItemQuantity } =
  cartSlice.actions;

export const selectCartItemsCount = (state) => {
  return state.entities.cart.items?.reduce(
    (total, item) => total + item.quantity,
    0
  );
};

export const selectTotal = (state) => {
  return state.entities.cart.items?.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
};

export default cartSlice.reducer;
