import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
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
      state.isLoggedIn = false;
      state.sessionId = null;
      state.user = null;
    },
    setSessionId(state, action) {
      state.sessionId = action.payload;
    },
  },
});

export const { login, loginSuccess, loginFailure, logout, setSessionId } =
  authSlice.actions;

export default authSlice.reducer;
