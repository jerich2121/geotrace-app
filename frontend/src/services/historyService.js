import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

const getAuthHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
});

export const historyService = {
  getHistory: async (token) => {
    const response = await axios.get(`${API_URL}/history`, { headers: getAuthHeaders(token) });
    return response.data;
  },
  addHistory: async (token, ipAddress, label) => {
    const response = await axios.post(`${API_URL}/history`, { ipAddress, label }, { headers: getAuthHeaders(token) });
    return response.data;
  },
  deleteHistory: async (token, ids) => {
    const response = await axios.delete(`${API_URL}/history`, { headers: getAuthHeaders(token), data: { ids } });
    return response.data;
  },
};