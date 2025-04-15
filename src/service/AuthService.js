
import axios from "axios";
import API from "./axiosInstant";
const API_BASE_URL = "http://localhost:8082"; // sửa lại đúng base URL server của bạn

export const sendOtp = async (email) => {
    try {
      const response = await API.post(`${API_BASE_URL}/send-otp`, { email });
      return response.data; // { message: "OTP sent to email" }
    } catch (error) {
      throw error.response?.data || { message: "Không gửi được OTP" };
    }
  };

export const verifyOtp = async (email, otp) => {
  try {
    const response =  await API.post(`${API_BASE_URL}/verify-otp`, {
      email,
      otp,
    }, {
      withCredentials: true, // 👈 Quan trọng!
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "OTP không hợp lệ hoặc đã hết hạn" };
  }
};
