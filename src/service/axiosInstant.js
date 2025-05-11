import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8082",
  withCredentials: true, // 👈 Cần thiết để gửi cookie chứa refresh token
});

API.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await API.post("/api/refresh-token");
        if (res.status === 200) {
          return API(originalRequest);
        }
      } catch (refreshError) {
        console.error("⚠️ Token refresh failed:", refreshError);

        // 👉 Tuỳ bạn: có thể chuyển về login, xoá token, hoặc hiển thị thông báo
        window.location.href = "/login"; // hoặc navigate("/login") nếu dùng React Router
      }
    }

    return Promise.reject(error);
  }
);

export default API;
