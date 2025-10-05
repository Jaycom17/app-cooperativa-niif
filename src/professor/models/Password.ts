import { z } from "zod";

export const PasswordSchema = z
  .object({
    usuOldPassword: z
      .string()
      .trim()
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
      .max(20, { message: "La contraseña no debe exceder 20 caracteres" })
      .regex(/[A-Z]/, {
        message: "La contraseña debe contener al menos una letra mayúscula",
      })
      .regex(/[a-z]/, {
        message: "La contraseña debe contener al menos una letra minúscula",
      })
      .regex(/\d/, {
        message: "La contraseña debe contener al menos un número",
      })
      .regex(/[@$!%*?&]/, {
        message:
          "La contraseña debe contener al menos un carácter especial (@$!%*?&)",
      }),
    usuPassword: z
      .string()
      .trim()
      .min(6, { message: "La nueva contraseña debe tener al menos 6 caracteres" })
      .max(20, { message: "La nueva contraseña no debe exceder 20 caracteres" })
      .regex(/[A-Z]/, {
        message: "La nueva contraseña debe contener al menos una letra mayúscula",
      })
      .regex(/[a-z]/, {
        message: "La nueva contraseña debe contener al menos una letra minúscula",
      })
      .regex(/\d/, {
        message: "La nueva contraseña debe contener al menos un número",
      })
      .regex(/[@$!%*?&]/, {
        message:
          "La nueva contraseña debe contener al menos un carácter especial (@$!%*?&)",
      }),
    confirmPassword: z
      .string()
      .trim()
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
      .max(20, { message: "La contraseña no debe exceder 20 caracteres" })
      .regex(/[A-Z]/, {
        message: "La contraseña debe contener al menos una letra mayúscula",
      })
      .regex(/[a-z]/, {
        message: "La contraseña debe contener al menos una letra minúscula",
      })
      .regex(/\d/, {
        message: "La contraseña debe contener al menos un número",
      })
      .regex(/[@$!%*?&]/, {
        message:
          "La contraseña debe contener al menos un carácter especial (@$!%*?&)",
      })
  })
  .refine((data) => data.usuPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type PasswordModel = z.infer<typeof PasswordSchema>;
