import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";
import { jwtDecode } from "jwt-decode";
const slice = createSlice({
  name: "users",
  initialState: {
    list: [],
    userId: null,
    token: null,
    loading: false,
    lastFetch: null,
  },
  reducers: {
    userRequested: (users, action) => {
      users.loading = true;
    },
    userReceived: (users, action) => {
      users.list = action.payload;
      users.loading = false;
      users.lastFetch = Date.now();
    },
    userRequestFailed: (users, action) => {
      users.loading = false;
    },
    userLoggedIn: (users, action) => {
      const token = action.payload.token;
      const userId = jwtDecode(token).id;
      users.token = token;
      users.userId = userId;
      users.loading = false;
      localStorage.setItem("token", action.payload.token);
    },
    setUserId: (users, action) => {
      users.userId = action.payload;
    },
    userLoggedOut: (users, action) => {
      users.token = null;
      users.userId = null;
      users.list = [];
      localStorage.removeItem("token");
    },
    userLoaded: (users, action) => {
      const user = action.payload;
      users.list = [...users.list, user];
      users.loading = false;
    },
  },
});

export const {
  userRequested,
  userReceived,
  userRequestFailed,
  userLoggedIn,
  userLoggedOut,
  setUserId,
  userLoaded,
} = slice.actions;

export default slice.reducer;

export const login = (credentials) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "/users/authenticate",
      method: "post",
      data: credentials,
      onStart: userRequested.type,
      onSuccess: userLoggedIn.type,
      onError: userRequestFailed.type,
    })
  );
};

export const logout = () => (dispatch, getState) => {
  const token = getState().entities.users.token; 
  const userId = getState().entities.users.userId;

  if (token) {
    dispatch(
      apiCallBegan({
        url: "/users/logout",
        method: "post",
        headers: { Authorization: `Bearer ${token}` },
        data: { user_id: userId },
        onSuccess: userLoggedOut.type,
        onError: userRequestFailed.type,
      })
    );
  } else {
    console.error("No token in state");
  }
};


export const loadUserById = (userId) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `/users/user/${userId}`,
      onStart: userRequested.type,
      onSuccess: userLoaded.type,
      onError: userRequestFailed.type,
    })
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
