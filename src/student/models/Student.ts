import { z } from "zod";

export const StudentSchema = z.object({
    stuCedula: z.string()
        .min(1, "La cedula es requerida")
        .max(10, "La cedula no puede tener mas de 10 caracteres")
        .transform((value) => value.trim()),
});

export type StudentModel = z.infer<typeof StudentSchema>;