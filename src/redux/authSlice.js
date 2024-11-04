import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: null,
  refreshToken: null,
  expiration: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isTokenValid(state) {
      if (Date.now() >= state.expiration) {
        fetchRefreshToken();
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchToken.fulfilled, (state, { payload }) => {
        state.token = payload.access;
        state.refreshToken = payload.refresh;
        state.expiration = Date.now() + 60 * 1000;
      })
      .addCase(fetchRefreshToken.fulfilled, (state, { payload }) => {
        if (payload.refresh_token) {
          state.refreshToken = payload.refresh;
        }

        state.token = payload.access;
        state.expiration = Date.now() + 60 * 1000;
      });
  },
});

export const fetchToken = createAsyncThunk(
  "auth/fetchToken",
  async (loginData) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/token/`,
        {
          email: loginData?.email,
          password: loginData?.password,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return data;
    } catch (error) {
      console.error("Erro ao obter token:", error);
    }
  }
);

export const fetchRefreshToken = createAsyncThunk(
  "auth/fetchRefreshToken",
  async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/token/refresh`,
        {
          refresh: state.refreshToken,
        }
      );

      return data;
    } catch (error) {
      console.error("Erro ao obter refresh token:", error);
    }
  }
);

export const { isTokenValid } = authSlice.actions;

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
