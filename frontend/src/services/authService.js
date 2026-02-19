import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

const api = axios.create({ baseURL: API_URL, headers: { "Content-Type": "application/json" } });

export const authService = {
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },
  getMe: async (token) => {
    const response = await api.get("/auth/me", { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  },
};