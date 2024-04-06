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
    setUnauthorized(state) {
      state.isLoggedIn = false;
      console.log("User unauthorized:", state);
    },
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
      console.log("User data:", action.payload);

      sessionStorage.setItem("sessionId", action.payload.sessionId);
      sessionStorage.setItem("userId", action.payload.userId);
      sessionStorage.setItem("userName", action.payload.userName);
    },
    loginFailure(state) {
      state.isLoading = false;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.sessionId = null;
      state.userId = null;
      state.userName = null;

      // Clear sessionStorage
      sessionStorage.removeItem("sessionId");
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("userName");
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
