import type { RoomModel } from "../models/Room";
import axiosInstance from "../../config/axios";

type CreateDto = Omit<RoomModel, "roomId" | "roomDate" | "roomStatus">;
type UpdateDto = Omit<
  RoomModel,
  "roomId" | "roomDate" | "roomStatus" | "usuId"
>;

export const RoomService = {
  create: (roomData: CreateDto): Promise<RoomModel> =>{
    return axiosInstance.post("/rooms", roomData);
  },

  update: (roomId: string, roomData: UpdateDto): Promise<RoomModel> =>{
    return axiosInstance.put(`/rooms/${roomId}`, roomData);
  },

  findById: (roomId: string): Promise<RoomModel> =>{
    return axiosInstance.get(`/rooms/${roomId}`);
  },
  delete: (roomId: string): Promise<{ message: string }> =>{
    return axiosInstance.delete(`/rooms/${roomId}`);
  },
  findAll: (): Promise<RoomModel[]> =>{
    return axiosInstance.get("/rooms");
  },
  updateRoomState: (roomData: { roomStatus: string }, roomId: string) =>{
    return axiosInstance.put(`/rooms/${roomId}/state`, roomData);
  },
};
