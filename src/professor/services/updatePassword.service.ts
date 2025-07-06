import type { PasswordModel } from "../models/Password";
import type { Response } from "../models/Response";

export const UpdatePasswordService = {
  updatePassword: (data: PasswordModel): Promise<Response<void>>=>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.usuOldPassword && data.usuPassword && data.confirmPassword) {
          resolve({ status: 200, data: undefined });
        } else {
          reject(new Error("Error updating password"));
        }
      }, 1000);
    }),
};
