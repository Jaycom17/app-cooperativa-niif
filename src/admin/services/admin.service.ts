import type { UserModel } from "../models/User";

type AdminDTO = Omit<UserModel, "usuId">;

export const AdminService = {
  updateAdmin: (userData: AdminDTO): Promise<{ status: number }> =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userData.usuName && userData.usuEmail && userData.usuPassword) {
          resolve({ status: 200 });
        } else {
          reject(new Error("Error updating admin data"));
        }
      }, 1000);
    }),
};
