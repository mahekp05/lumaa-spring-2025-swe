import axios from "axios";

const API_URL = "http://localhost:5000"; // Backend URL

const api = axios.create({
  baseURL: API_URL,
});

// Attach token to requests if user is logged in
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {}; 
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
