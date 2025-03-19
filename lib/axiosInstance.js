import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
	timeout: 10000,
});

axiosInstance.interceptors.request.use((config) => {
	const token = Cookies.get("accessToken");
	console.log("Token being sent:", token);
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response?.status === 401) {
			// Remove expired token and user info
			Cookies.remove("accessToken");
			localStorage.removeItem("user");
			// Redirect to the login page
			if (typeof window !== "undefined") {
				window.location.href = "/auth/login";
			}
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
