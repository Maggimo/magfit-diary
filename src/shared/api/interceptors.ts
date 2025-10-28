import axios from "axios";
import { useUserStore } from "../../entities/user/slice/userStore.ts";
import { refreshTokensRequest } from "./userApi.ts";

export const $api = axios.create({
  baseURL: "http://127.0.0.1:3000/api/",
  withCredentials: true,
});

// A bare instance without interceptors to avoid recursion/cycles for refresh
export const $raw = axios.create({
  baseURL: "http://127.0.0.1:3000/api/",
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  const token = useUserStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

$api.interceptors.response.use(
  (response) => {
    // Just pass through successful responses
    return response;
  },
  async (error) => {
    const originalRequest = error.config || {};
    const status = error?.response?.status;

    if (status === 401) {
      try {
        // Call refresh without interceptors to avoid loops
        const r = await refreshTokensRequest();
        const newToken = r.data; // backend returns plain string access token
        if (newToken) {
          useUserStore.getState().setAccessToken(newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          // Retry the original request with the new token
          return $api(originalRequest);
        }
        return Promise.reject(error);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  },
);
