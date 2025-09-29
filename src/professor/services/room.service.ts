import type { RoomModel } from "@/professor/models/Room";
import axiosInstance from "@/config/axios";

type CreateDto = Omit<RoomModel, "roomID" | "roomDate" | "roomStatus">;
type UpdateDto = Omit<
  RoomModel,
  "roomID" | "roomDate" | "roomStatus" | "usuID"
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
  findAll: async (): Promise<RoomModel[]> =>{
    const response = await axiosInstance.get("/rooms");
    return response.data;
  },
  updateRoomState: (roomData: { roomState: string }, roomID: string) =>{
    axiosInstance.put(`/rooms/change-state/${roomID}`, roomData);
  },
  validatePassword: async (roomPassword: string): Promise<{roomID: string, stuID: string}> => {
    const response = await axiosInstance.post(`/rooms/validate-password`, { roomPassword });
    return response.data;
  }
};
