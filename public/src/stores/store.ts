import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
