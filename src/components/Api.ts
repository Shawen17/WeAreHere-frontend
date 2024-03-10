import axios from "axios";

const api = axios.create({
  baseURL: "https://we-are-here-backend.vercel.app/api/",
  // baseURL: "http://13.53.97.55:8000", // Change to your Django backend URL
  // baseURL: "http://localhost:8000",
});

export default api;

export const BASE_URL = `${process.env.REACT_APP_BASE_URL}
// export const BASE_URL = "http://13.53.97.55:8000";
// export const BASE_URL = "http://localhost:8000";
