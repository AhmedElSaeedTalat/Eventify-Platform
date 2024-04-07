import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  isLoggedIn: false,
  isLoading: false,
  sessionId: null,
  userName: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isLoading = true;
    },
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.isLoading = false;
      state.userId = action.payload.userId;
      state.sessionId = action.payload.sessionId;
      state.userName = action.payload.userName;
      console.log("User logged in:", state);
    },
    loginFailure(state) {
      state.isLoading = false;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.sessionId = null;
      state.userId = null;
      state.userName = null;
    },
  },
});

export const { login, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
