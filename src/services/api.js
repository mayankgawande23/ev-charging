import axios from "axios";
import { apiConfig } from "../config/apiConfig";

export const api = axios.create(apiConfig);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
