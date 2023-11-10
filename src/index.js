import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { jwtDecode } from "jwt-decode"; // Corrected import
import { setUserId } from "./store/slices/userSlice";
import { PersistGate } from "redux-persist/integration/react";

const { store, persistor } = configureStore();

const isAuthenticated = localStorage.getItem("token");
store.subscribe(() => console.log(store.getState()));

const root = ReactDOM.createRoot(document.getElementById("root"));

if (isAuthenticated) {
  try {
    const decoded = jwtDecode(isAuthenticated);
    const userId = decoded.id;
    store.dispatch(setUserId(userId));
  } catch (error) {
    console.log("Token decode error", error);
  }
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
