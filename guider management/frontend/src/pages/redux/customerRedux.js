import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    currentCustomer: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentCustomer = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = customerSlice.actions;
export default customerSlice.reducer;
