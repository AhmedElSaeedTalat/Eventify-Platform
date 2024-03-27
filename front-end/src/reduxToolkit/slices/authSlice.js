import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: true,
  user: null, // You can include additional user information here if needed
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload; // You can set user data here if needed
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
