import { z } from "zod";

export interface RoomModel {
  roomId: string;
  roomName: string;
  roomPassword: string;
  roomDate: string;
  roomStatus: "open" | "closed";
  usuId: string;
}


export const RoomSchema = z.object({
  roomName: z
    .string()
    .trim()
    .min(1, { message: "El nombre de la sala es obligatorio" }),
  roomPassword: z
    .string()
    .trim()
    .min(1, { message: "El código de la sala es obligatorio" }),
});

export type RoomFormSchema = z.infer<typeof RoomSchema>;