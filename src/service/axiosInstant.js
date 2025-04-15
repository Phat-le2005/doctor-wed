import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8082",
  withCredentials: true, // 👈 Bắt buộc để gửi cookie
});

// Interceptor để tự refresh token nếu lỗi 401
API.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await API.get("/api/refresh-token");
        return API(originalRequest);
      } catch (refreshError) {
        console.error("⚠️ Token refresh failed:", refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default API;
