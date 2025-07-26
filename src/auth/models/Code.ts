import { z } from "zod";

export interface Code {
    roomPassword: string;
}

export const CodeSchema = z.object({
    roomPassword: z.string().min(6, "El código de la sala debe tener al menos 6 caracteres.").max(100, "El código de la sala no puede tener más de 100 caracteres.")
});

