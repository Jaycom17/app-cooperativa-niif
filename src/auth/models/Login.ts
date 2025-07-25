import { z } from "zod";

export interface LoginModel{
  email: string;
  password: string;
}

export const LoginSchema = z.object({
  email: z.string({
    required_error: "Se requiere un email",
  })
  .nonempty({ message: "Se requiere un email" })
  .email({ message: "Email inválido" }),

  password: z.string({
    required_error: "Se requiere una contraseña",
  })
  .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  .max(20, { message: "La contraseña no debe exceder 20 caracteres" })
  .regex(/[A-Z]/, { message: "La contraseña debe contener al menos una letra mayúscula" })
  .regex(/[a-z]/, { message: "La contraseña debe contener al menos una letra minúscula" })
  .regex(/\d/, { message: "La contraseña debe contener al menos un número" })
  .regex(/[@$!%*?&]/, { message: "La contraseña debe contener al menos un carácter especial (@$!%*?&)" })
});
