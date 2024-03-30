import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import eventReducer from "./slices/EventSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
  },
});

export default store;
