import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.status = "loading";
    },
    loginSuccess(state, action) {
      state.status = "succeeded";
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    loginFailure(state, action) {
      state.status = "failed";
      state.error = action.payload.error;
    },
  },
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
