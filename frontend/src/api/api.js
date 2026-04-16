import axios from "axios";

// Create an axios instance with the backend base URL
const api = axios.create({
  baseURL: "http://localhost:8080",
});

// Before every request, attach the JWT token if it exists in localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
},
  (error) => {
    return Promise.reject(error);
  });

export default api;
