import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.31.161:3000",
});

// Intercept requests to add the token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
