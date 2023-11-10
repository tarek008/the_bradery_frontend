import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";

const slice = createSlice({
  name: "products",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    productsRequested: (products) => {
      products.loading = true;
    },

    productsReceived: (products, action) => {
      if (Array.isArray(action.payload)) {
        products.list = action.payload;
      } else {
        products.list = [];
      }
      products.loading = false;
      products.lastFetch = Date.now();
    },

    productsRequestFailed: (products) => {
      products.loading = false;
    },
  },
});

export const { productsReceived, productsRequested, productsRequestFailed } =
  slice.actions;
export default slice.reducer;

export const getProducts = () =>
  apiCallBegan({
    url: "/products/allProducts",
    method: "get",
    onStart: productsRequested.type,
    onSuccess: productsReceived.type,
    onError: productsRequestFailed.type,
  });
