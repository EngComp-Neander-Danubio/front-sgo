import axios from "axios";

/* console.log("API URL:", import.meta.env.VITE_API_URL);
console.log("API URL:", process.env.VITE_API_URL); */

const api = axios.create({
  baseURL: process.env.VITE_API_URL,
});

export default api;
