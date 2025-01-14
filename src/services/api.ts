import axios from "axios";
import { getUserLocalStorage } from "../context/AuthProvider/util";

const userAuth = getUserLocalStorage();

const api = axios.create({
  baseURL: process.env.VITE_API_URL,
  headers: {
    'Authorization': userAuth?.token ? `Bearer ${userAuth?.token}` : '',
  }
});

// Usando interceptores para adicionar o token a todas as requisições automaticamente
api.interceptors.request.use(
  (config) => {

    if (userAuth?.token) {
      config.headers['Authorization'] = `Bearer ${userAuth?.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
