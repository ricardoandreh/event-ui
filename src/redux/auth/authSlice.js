import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const ONE_MINUTE = 60 * 1000;

const initialState = {
  token: null,
  refreshToken: null,
  expiration: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.refreshToken = null;
      state.expiration = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchToken.fulfilled, (state, { payload }) => {
        state.token = payload?.access;
        state.refreshToken = payload?.refresh;
        state.expiration = Date.now() + ONE_MINUTE;
      })
      .addCase(fetchRefreshToken.fulfilled, (state, { payload }) => {
        if (payload?.access) {
          state.token = payload?.access;
          state.expiration = Date.now() + ONE_MINUTE;
        }
      });
  },
});

export const fetchToken = createAsyncThunk(
  "auth/fetchToken",
  async (loginData, { rejectWithValue }) => {
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

      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchRefreshToken = createAsyncThunk(
  "auth/fetchRefreshToken",
  async (_, { getState, rejectWithValue }) => {
    const { auth } = getState();

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/token/refresh/`,
        {
          refresh: auth?.refreshToken,
        }
      );

      return data;
    } catch (error) {
      console.error("Erro ao obter refresh token:", error);

      return rejectWithValue(error?.response?.data);
    }
  }
);

export const { logout } = authSlice.actions;

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
