import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories:0,
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers:{},
})

export default categoriesSlice.reducer;