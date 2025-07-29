import type { UserModel } from "../models/User";
import axiosInstance from "../../config/axios";

type AdminDTO = Omit<UserModel, "usuID">;

export const AdminService = {
  updateAdmin: (userData: AdminDTO, usuID: string): Promise<void> =>{
    return axiosInstance.put(`/users/admin/${usuID}`, userData)
  },
  profile: (): Promise<any> => {
    return axiosInstance.get("/auth/profile");
  },
  getAdminById: async (usuID: string): Promise<UserModel> => {
    const response = await axiosInstance.get(`/users/${usuID}`);
    return response.data;
  }
};
