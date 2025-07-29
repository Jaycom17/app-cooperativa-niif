import { z } from "zod";

export interface RoomModel {
  roomID: string;
  roomName: string;
  roomPassword: string;
  roomDate: string;
  roomStatus: "open" | "closed";
  usuID: string;
}

export const RoomSchema = z.object({
  roomName: z
    .string()
    .trim()
    .min(1, { message: "El nombre de la sala es obligatorio" }),
  roomPassword: z
    .string()
    .trim()
    .min(6, {
      message: "El código de la sala debe tener al menos 6 caracteres.",
    })
    .max(100, {
      message: "El código de la sala no puede tener más de 100 caracteres.",
    }),
});

export type RoomFormSchema = z.infer<typeof RoomSchema>;
