// @ts-nocheck
import { IMerch, IMerchOrder } from "@/types/dataTypes";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartItemObject {
  [key: string]: IMerchOrder;
}

export interface CartState {
  cart: CartItemObject;
}

const initialState: CartState = {
  cart: {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<IMerch | IMerchOrder>) => {
      const itemToAdd = action.payload as IMerchOrder;
      const item = state.cart?.[itemToAdd?.id];

      if (item) {
        state.cart[itemToAdd.id].qty += 1;
      } else {
        state.cart[itemToAdd.id] = { ...itemToAdd, qty: 1 };
      }
    },

    decrementItem: (state, action: PayloadAction<IMerchOrder>) => {
      const item = state.cart?.[action.payload?.id];

      if (item) {
        state.cart[action.payload.id].qty -= 1;
      }
    },

    removeItem: (state, action: PayloadAction<IMerchOrder>) => {
      const item = state.cart?.[action.payload?.id];

      if (item) {
        delete state.cart?.[action.payload?.id];
      }
    },

    emptyCart: (state) => {
      state.cart = {};
    },

    // editItemValue: (state, action: PayloadAction<>) => {
    //   const item = state.cart?.[action.payload?.id];

    //   if (item) {
    //     delete state.cart?.[action.payload?.id];
    //   }
    // },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, decrementItem, removeItem, emptyCart } =
  cartSlice.actions;

export default cartSlice.reducer;
