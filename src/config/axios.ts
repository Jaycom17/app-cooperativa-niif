import axios from "axios";
import { API_URL } from "./env";

console.log("API_URL:", API_URL);

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default axiosInstance;
