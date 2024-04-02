import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  sessionId: null,
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
      state.sessionId = null;
    },
    setSessionId(state, action) {
      state.sessionId = action.payload;
    },
  },
});

export const { login, loginSuccess, loginFailure, logout, setSessionId } =
  authSlice.actions;

export default authSlice.reducer;
