import { z } from "zod";

export interface LoginModel{
  usuEmail: string;
  usuPassword: string;
}

export const LoginSchema = z.object({
  usuEmail: z.string({
    required_error: "Se requiere un email",
  })
  .nonempty({ message: "Se requiere un email" })
  .email({ message: "Email inválido" }),

  usuPassword: z.string({
    required_error: "Se requiere una contraseña",
  })
  .nonempty({ message: "Se requiere una contraseña" })
  .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});
