import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  isLoggedIn: false,
  isLoading: false,
  sessionId: null,
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
      state.sessionId = action.payload.sessionId;
      state.userId = action.payload.userId;
      console.log("User logged in:", state);
      console.log("User data:", action.payload);
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

export const {
  login,
  loginSuccess,
  loginFailure,
  logout,
  setSessionId,
  setUnauthorized,
} = authSlice.actions;

export default authSlice.reducer;
