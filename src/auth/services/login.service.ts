import type { LoginModel } from "../models/Login"
import axiosInstance from "../../config/axios"

export const LoginService = {
    login: async (data: LoginModel) => {
        const response = await axiosInstance.post("/auth/login", data);
        return response;
    },
    logout: async () => {
        const response = await axiosInstance.post("/auth/logout");
        return response;
    },
    profile: async () => {
        const response = await axiosInstance.get("/auth/profile");
        return response;
    },
    studentProfile: async () => {
        const response = await axiosInstance.get("/auth/studentProfile");
        return response;
    }
}