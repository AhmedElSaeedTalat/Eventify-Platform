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
    setUnauthorized(state) {
      state.isLoggedIn = false;
      console.log("User unauthorized:", state);
    },
    login(state) {
      state.isLoading = true;
    },
    loginSuccess(state, action) {
      state.user = action.payload.user; // Update to include user data
      state.isLoggedIn = true;
      state.isLoading = false;
      state.sessionId = action.payload.sessionId; // Set sessionId from payload
      state.userId = action.payload.userId; // Set userId from payload
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
