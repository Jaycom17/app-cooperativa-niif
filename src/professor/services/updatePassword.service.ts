import axiosInstance from "../../config/axios";
import type { PasswordModel } from "../models/Password";

export const UpdatePasswordService = {
  updatePassword: async (data: PasswordModel): Promise<void>=>{
    return axiosInstance.put("/users/password", data);
  },
};
