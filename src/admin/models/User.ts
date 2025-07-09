import { z } from "zod";

export interface UserModel {
  usuId: string;
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
            .refine((val) => !val || (val.length >= 6 && val.length <= 50), {
                message: "La contraseña debe tener entre 6 y 50 caracteres",
                path: ["usuPassword"],
            }),
        confirmPassword: z
            .string()
            .optional()
            .refine((val) => !val || (val.length >= 6 && val.length <= 50), {
                message:
                    "La confirmación de contraseña debe tener entre 6 y 50 caracteres",
                path: ["confirmPassword"],
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
            .min(6, "La contraseña debe tener entre 6 y 50 caracteres")
            .max(50, "La contraseña debe tener entre 6 y 50 caracteres"),
        confirmPassword: z
            .string()
            .min(6, "La confirmación de contraseña debe tener entre 6 y 50 caracteres")
            .max(50, "La confirmación de contraseña debe tener entre 6 y 50 caracteres"),
    })
    .refine((data) => data.usuPassword === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    });

export type UserFormData = z.infer<typeof UserEditSchema>;
