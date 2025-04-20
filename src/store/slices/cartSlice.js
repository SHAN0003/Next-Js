import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logedUserID: null,
  logedUserName: "",
  cartItems: [],
  cartCount: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addUser: (state, action) => {
        state.logedUserID = action.payload.id;
        state.logedUserName = action.payload.name;
    },

    loadCart: (state, action) => {
        state.cartItems = action.payload.items || [];
        state.cartCount = action.payload.count || 0;
    }
  },
});
