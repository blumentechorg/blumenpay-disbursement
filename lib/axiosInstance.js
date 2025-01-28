import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 2000,
});
console.log("API Base URL:", process.env.NEXT_PUBLIC_API_BASE_URL);

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("authToken");
  console.log("Token being sent:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log(config);
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Cookies.remove("authToken");
      // localStorage.removeItem("user");
      // window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
