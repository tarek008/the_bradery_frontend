import { combineReducers } from "redux";
import productSlice from "./slices/productSlice";
import cartSlice from "./slices/carteSlice";
import commandSlice from "./slices/CommandeSlice";
import userSlice from "./slices/userSlice";


export default combineReducers({
  products: productSlice,
  cart: cartSlice,
  commandes: commandSlice,
  users: userSlice,
});
