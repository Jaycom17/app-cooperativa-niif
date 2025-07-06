import { z } from "zod";

export const PasswordSchema = z
  .object({
    usuOldPassword: z
      .string()
      .trim()
      .min(1, { message: "La contraseña actual es obligatoria" }),
    usuPassword: z
      .string()
      .trim()
      .min(1, { message: "La nueva contraseña es obligatoria" }),
    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: "La confirmación de la contraseña es obligatoria" }),
  })
  .refine((data) => data.usuPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type PasswordModel = z.infer<typeof PasswordSchema>;
