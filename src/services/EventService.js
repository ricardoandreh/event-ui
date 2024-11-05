import axios from "axios";
import { fetchRefreshToken } from "../redux/auth/authSlice";
import { store } from "../redux/store";

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

let refreshTokenPromise = null;

apiClient.interceptors.request.use(
  async (config) => {
    const { auth } = store.getState();

    if (auth?.token) {
      const isTokenValid = Date.now() < auth.expiration;

      if (!isTokenValid) {
        if (!refreshTokenPromise) {
          refreshTokenPromise = store.dispatch(fetchRefreshToken());
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
  getEvent(id) {
    return apiClient.get(`/events/${id}`);
  },
};
