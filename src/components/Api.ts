import axios from "axios";

const api = axios.create({
  baseURL: "https://we-are-here-backend.vercel.app/api/", // Change to your Django backend URL
});

export default api;

export const BASE_URL = "https://we-are-here-backend.vercel.app";
