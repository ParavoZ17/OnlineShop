import { createSlice } from "@reduxjs/toolkit";

const savedCart = localStorage.getItem("cart");

const initialState = {
  items: savedCart ? JSON.parse(savedCart) : [],
};

const saveToLocalStorage = (items) => {
  localStorage.setItem("cart", JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const payload = action.payload;
      const qtyToAdd = Number(payload.quantity) || 1; 

      const existingItem = state.items.find((i) => i.id === payload.id);

      if (existingItem) {
      
        existingItem.quantity = (existingItem.quantity || 0) + qtyToAdd;
      } else {
        
        state.items.push({ ...payload, quantity: qtyToAdd });
      }

      saveToLocalStorage(state.items);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      saveToLocalStorage(state.items);
    },

    incrementQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity = (item.quantity || 0) + 1;
      saveToLocalStorage(state.items);
    },

    decrementQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      saveToLocalStorage(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      saveToLocalStorage(state.items);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
