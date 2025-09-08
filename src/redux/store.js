import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from './slice/categoriesSlice'

import  productsReducer  from "./slice/productSlice";

const store = configureStore({
    reducer:{
        categories: categoriesReducer,
        products: productsReducer,
    },
})


export default store;