import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isLoading = true;
    },
    loginSuccess(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
      console.log("User logged in:", state.user);
    },
    loginFailure(state) {
      state.isLoading = false;
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
