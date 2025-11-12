import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://swiftstaynigeria-ua1e.onrender.com/api",
  timeout: 10000,
});

// Add a request interceptor to include JWT token automatically
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage (or wherever you store it)
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

// Optional: Response interceptor for handling global errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Token may be missing or expired.");
      // Optional: redirect to login or clear token
    }
    return Promise.reject(error);
  }
);

export default api;
