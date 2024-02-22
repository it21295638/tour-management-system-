import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./customerRedux";

export default configureStore({
  reducer: {
    customer: customerReducer,
  },
});
