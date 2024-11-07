import axios, { AxiosRequestConfig } from "axios";
import { fetchRefreshToken } from "../features/auth/authThunk";
import { RootState, store } from "../features/store";

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

let refreshTokenPromise: Promise<void> | null = null;

apiClient.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const { auth } = store.getState() as RootState;

    if (auth?.token) {
      const isTokenValid = Date.now() < (auth?.expiration || 0);

      if (!isTokenValid) {
        if (!refreshTokenPromise) {
          refreshTokenPromise = store.dispatch(
            fetchRefreshToken() as Promise<void>
          );
        }

        await refreshTokenPromise;
        refreshTokenPromise = null;
      }

      const { token } = store.getState().auth;
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  getEvents() {
    return apiClient.get("/events");
  },
  getEvent(id: number) {
    return apiClient.get(`/events/${id}`);
  },
};
