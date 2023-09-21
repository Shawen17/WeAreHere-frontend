import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/", // Change to your Django backend URL
});

export default api;

export const BASE_URL = "http://localhost:8000";
