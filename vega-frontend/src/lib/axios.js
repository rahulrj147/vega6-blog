import axios from "axios";

import { NEXT_PUBLIC_API_URL as apiBaseURL } from "@/config/env.config";

const api = axios.create({
  baseURL: apiBaseURL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    const isAuthRequest = original.url.includes("/login") || original.url.includes("/register");

    if (error.response?.status === 401 && !original._retry && !isAuthRequest) {
      original._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token available");

        const { data } = await axios.post(
          `${apiBaseURL}/users/refresh`,
          { refreshToken }
        );
        
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        
        original.headers.Authorization = `Bearer ${data.data.accessToken}`;
        return api(original);
      } catch (err) {
        localStorage.clear();
        if (typeof window !== 'undefined') window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
