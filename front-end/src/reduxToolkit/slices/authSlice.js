import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  userId: sessionStorage.getItem("userId"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUnauthorized(state) {
      state.isLoggedIn = false;
      console.log("User unauthorized:", state);
    },
    login(state) {
      state.isLoading = true;
    },
    loginSuccess(state, action) {
      state.user = action.payload.user;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.userId = action.payload.userId;
      state.sessionId = action.payload.sessionId;
      console.log("User logged in:", state);
      console.log("User data:", action.payload);

      // Store session ID and user ID in sessionStorage
      sessionStorage.setItem("userId", action.payload.userId);
    },
    loginFailure(state) {
      state.isLoading = false;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.sessionId = null;
      state.userId = null;
      state.user = null;

      // Clear sessionStorage
      sessionStorage.removeItem("sessionId");
      sessionStorage.removeItem("userId");
    },
    setSessionId(state, action) {
      state.sessionId = action.payload;
    },
  },
});

export const {
  login,
  loginSuccess,
  loginFailure,
  logout,
  setSessionId,
  setUnauthorized,
} = authSlice.actions;

export default authSlice.reducer;
