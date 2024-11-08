import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { AuthResponse } from "../../types/auth-response";
import { ErrorResponse } from "../../types/error";
import { loginForm } from "../../types/form";
import { RootState } from "../store";

export const fetchToken = createAsyncThunk<
  AuthResponse,
  loginForm,
  { rejectValue: ErrorResponse }
>("auth/fetchToken", async (loginData: loginForm, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<AuthResponse>(
      `${import.meta.env.VITE_API_URL}/token/`,
      {
        email: loginData?.email,
        password: loginData?.password,
      }
    );

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue({
        message: error.response?.data || "Erro ao resgatar accessToken",
        code: error.response?.status,
      });
    }

    return rejectWithValue({ message: "Erro ao resgatar accessToken" });
  }
});

export const fetchRefreshToken = createAsyncThunk<
  AuthResponse,
  void,
  { rejectValue: ErrorResponse }
>("auth/fetchRefreshToken", async (_, { getState, rejectWithValue }) => {
  const { auth } = getState() as RootState;

  try {
    const { data } = await axios.post<AuthResponse>(
      `${import.meta.env.VITE_API_URL}/token/refresh/`,
      {
        refresh: auth?.refreshToken,
      }
    );

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue({
        message: error.response?.data || "Erro ao resgatar refreshToken",
        code: error.response?.status,
      });
    }

    return rejectWithValue({ message: "Erro ao resgatar refreshToken" });
  }
});
