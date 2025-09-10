import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slice/categoriesSlice";
import basketReducer from "./slice/bastetSlice";
import productsReducer from "./slice/productSlice";

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    basket: basketReducer,
  },
});

export default store;
