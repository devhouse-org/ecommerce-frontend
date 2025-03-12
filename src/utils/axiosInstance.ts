import axios from "axios";

// Create an axios instance with Vite environment variables
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://ecoefrskjvndlkrjhbdb.xyz", // Use environment variable or fallback
  timeout: 10000, // Optional timeout
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`, // Use API key from .env
  },
});
// Interceptors (same as before)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

