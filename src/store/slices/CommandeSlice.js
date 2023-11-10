import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";

// Slice
const slice = createSlice({
  name: "commandes",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
    orderError: null,
    orderStatus: "idle", // idle, loading, success, failed
    currentOrder: null,
  },
  reducers: {
    commandesRequested: (state) => {
      state.loading = true;
      state.orderStatus = "loading";
    },
    commandesReceived: (state, action) => {
      state.list = action.payload;
      state.loading = false;
      state.lastFetch = Date.now();
      state.orderStatus = "success";
    },
    commandesRequestFailed: (state, action) => {
      state.loading = false;
      state.orderError = action.payload;
      state.orderStatus = "failed";
    },
    orderStatusReset: (state) => {
      state.orderStatus = "idle";
      state.orderError = null;
    },
    currentOrderSet: (state, action) => {
      state.currentOrder = action.payload;
    },
  },
});

// Action Export
export const {
  commandesRequested,
  commandesReceived,
  commandesRequestFailed,
  orderStatusReset,
  currentOrderSet,
} = slice.actions;

// Action Creators
const url = "/commandes";

export const fetchCommandes = (userId) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: `${url}/getCommandes?user_id=${userId}`,
      onStart: commandesRequested.type,
      onSuccess: commandesReceived.type,
      onError: commandesRequestFailed.type,
      headers: {
        Authorization: `Bearer ${getState().entities.users.token}`,
      },
    })
  );
};

export const passerCommande = (order) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: `${url}/passerCommande`,
      method: "post",
      data: order,
      onSuccess: currentOrderSet.type,
      onError: commandesRequestFailed.type,
      headers: {
        Authorization: `Bearer ${getState().entities.users.token}`,
      },
    })
  );
};

export const createCheckoutSession = (orderData) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: `${url}/createCheckoutSession`,
      method: "post",
      data: { items: orderData.items },
      onSuccess: currentOrderSet.type,
      onError: commandesRequestFailed.type,
      headers: {
        Authorization: `Bearer ${getState().entities.users.token}`,
      },
    })
  );
};

export default slice.reducer;
