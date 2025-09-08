    import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3333"

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
      const response = await axios.get(`${BASE_URL}/products/all`);
      return response.data;
  
  }
);

const initialState = {
    data: [],
    status: "idle",
    error: null,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state)=> {
            state.status = 'loading';
        })
         .addCase(fetchProducts.fulfilled, (state, action)=> {
            state.data = action.payload;
            state.status = 'succeeded';
        })
        .addCase(fetchProducts.rejected, (state, action)=> {
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
})

export default productsSlice.reducer;