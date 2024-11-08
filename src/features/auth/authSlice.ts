import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../types/auth-state";
import { RootState } from "../store";
import { fetchRefreshToken, fetchToken } from "./authThunk";

const ONE_MINUTE = 1000 * 60;

const initialState: AuthState = {
  token: null,
  expiration: null,
  isPending: false,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.isPending = false;
      state.expiration = null;
      state.refreshToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchToken.pending, (state) => {
        state.isPending = true;
      })
      .addCase(fetchToken.rejected, (state) => {
        state.isPending = false;
      })
      .addCase(fetchToken.fulfilled, (state, { payload }) => {
        state.isPending = false;
        state.token = payload?.access ?? null;
        state.refreshToken = payload?.refresh ?? null;
        state.expiration = Date.now() + ONE_MINUTE;
      })
      .addCase(fetchRefreshToken.fulfilled, (state, { payload }) => {
        if (payload?.access) {
          state.token = payload?.access ?? null;
          state.expiration = Date.now() + ONE_MINUTE;
        }
      });
  },
});

export const { logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
