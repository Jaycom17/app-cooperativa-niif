import { z } from "zod";

export interface UserModel {
  usuID: string;
  usuName: string;
  usuEmail: string;
  usuPassword?: string;
}

// Esquema para editar (contraseñas opcionales)
export const UserEditSchema = z
  .object({
    usuName: z
      .string()
      .min(1, "El nombre es obligatorio")
      .max(50, "El nombre no puede exceder los 50 caracteres"),
    usuEmail: z
      .string()
      .email("El correo electrónico no es válido")
      .max(100, "El correo electrónico no puede exceder los 100 caracteres"),
    usuPassword: z
      .string()
      .optional()
      .refine((val) => !val || (val.length >= 6 && val.length <= 20), {
        message: "La contraseña debe tener entre 6 y 20 caracteres",
        path: ["usuPassword"],
      })
      .refine((val) => !val || /[A-Z]/.test(val), {
        message: "La contraseña debe contener al menos una letra mayúscula",
      })
      .refine((val) => !val || /[a-z]/.test(val), {
        message: "La contraseña debe contener al menos una letra minúscula",
      })
      .refine((val) => !val || /\d/.test(val), {
        message: "La contraseña debe contener al menos un número",
      })
      .refine((val) => !val || /[@$!%*?&]/.test(val), {
        message:
          "La contraseña debe contener al menos un carácter especial (@$!%*?&)",
      }),
    confirmPassword: z
      .string()
      .optional()
      .refine((val) => !val || (val.length >= 6 && val.length <= 20), {
        message:
          "La confirmación de contraseña debe tener entre 6 y 20 caracteres",
        path: ["confirmPassword"],
      })
      .refine((val) => !val || /[A-Z]/.test(val), {
        message:
          "La confirmación de contraseña debe contener al menos una letra mayúscula",
      })
      .refine((val) => !val || /[a-z]/.test(val), {
        message:
          "La confirmación de contraseña debe contener al menos una letra minúscula",
      })
      .refine((val) => !val || /\d/.test(val), {
        message:
          "La confirmación de contraseña debe contener al menos un número",
      })
      .refine((val) => !val || /[@$!%*?&]/.test(val), {
        message:
          "La confirmación de contraseña debe contener al menos un carácter especial (@$!%*?&)",
      }),
  })
  .refine((data) => data.usuPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

// Esquema para crear (contraseñas obligatorias)
export const UserCreateSchema = z
  .object({
    usuName: z
      .string()
      .min(1, "El nombre es obligatorio")
      .max(50, "El nombre no puede exceder los 50 caracteres"),
    usuEmail: z
      .string()
      .email("El correo electrónico no es válido")
      .max(100, "El correo electrónico no puede exceder los 100 caracteres"),
    usuPassword: z
      .string()
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
    confirmPassword: z
      .string()
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
  })
  .refine((data) => data.usuPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type UserFormData = z.infer<typeof UserEditSchema>;
