import axios from "axios";
import Cookies from "js-cookie";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://blumenpay-1.onrender.com", // Base URL of your API
  withCredentials: true,
  headers: {
    "Content-Type": "application/json", // Default content type
    Accept: "application/json",
  },
});

// // Add request interceptor to include token in headers
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get("authToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Add response interceptor to handle errors
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       Cookies.remove("authToken");
//       window.location.href = "/login"; // Redirect to login on unauthorized
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
