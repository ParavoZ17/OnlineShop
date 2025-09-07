import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from './slice/categoriesSlice'

const store = configureStore({
    reducer:{
        categoriesReducer,
    },
})


export default store;