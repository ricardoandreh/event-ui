import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { loginForm } from "../../types/form";
import { RootState } from "../store";

export const fetchToken = createAsyncThunk<
  RefreshTokenResponse,
  loginForm,
  { rejectValue: ErrorResponse } // Aqui, tipamos o erro como um objeto com `message` e opcionalmente `code`
>("auth/fetchToken", async (loginData: loginForm, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<RefreshTokenResponse>(
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
        message: error.response?.data.message || "Erro desconhecido",
        code: error.response?.status,
      });
    }

    return rejectWithValue({ message: "Erro desconhecido" });
  }
});

export const fetchRefreshToken = createAsyncThunk<
  RefreshTokenResponse,
  void,
  { rejectValue: ErrorResponse } // Aqui, tipamos o erro como um objeto com `message` e opcionalmente `code`
>("auth/fetchRefreshToken", async (_, { getState, rejectWithValue }) => {
  const { auth } = getState() as RootState;

  try {
    const { data } = await axios.post<RefreshTokenResponse>(
      `${import.meta.env.VITE_API_URL}/token/refresh/`,
      {
        refresh: auth?.refreshToken,
      }
    );

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue({
        message: error.response?.data.message || "Erro desconhecido",
        code: error.response?.status,
      });
    }

    return rejectWithValue({ message: "Erro desconhecido" });
  }
});
