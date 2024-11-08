import axios from "axios";
import { Event, EventsResponse } from "types/event";
import { fetchRefreshToken } from "../features/auth/authThunk";
import { RootState, store } from "../features/store";
import { AuthResponse } from "../types/auth-response";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

let refreshTokenPromise: Promise<AuthResponse> | null = null;

apiClient.interceptors.request.use(
  async (config) => {
    const { auth } = store.getState() as RootState;

    if (auth?.token) {
      const isTokenValid = Date.now() < (auth?.expiration || 0);

      if (!isTokenValid) {
        if (!refreshTokenPromise) {
          refreshTokenPromise = store
            .dispatch(fetchRefreshToken())
            .unwrap() as Promise<AuthResponse>;
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
    return apiClient.get<EventsResponse>("/events");
  },
  getEvent(id: string) {
    return apiClient.get<Event>(`/events/${id}`);
  },
};
