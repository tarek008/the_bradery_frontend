import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import reducer from "./reducer";
import toast from "./middleware/toast";
import api from "./middleware/api";

// persistConfig defines how and where to persist the Redux store
const persistConfig = {
  key: "root",
  storage,
};

// persistedReducer wraps the root reducer with persistReducer to save its state
const persistedReducer = persistReducer(persistConfig, reducer);

export default function configureAppStore() {
  // The store is created with the persisted reducer
  const store = configureStore({
    reducer: persistedReducer,
    middleware: [
      ...getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
      toast,
      api,
    ],
  });

  // persistStore creates the persistor with the created store
  let persistor = persistStore(store);

  return { store, persistor };
}
