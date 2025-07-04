import type { RoomModel } from "../models/Room";
import type { Response } from "../models/Response";

type CreateDto = Omit<RoomModel, "roomId" | "roomDate" | "roomStatus">;
type UpdateDto = Omit<
  RoomModel,
  "roomId" | "roomDate" | "roomStatus" | "usuId"
>;

export const RoomService = {
  create: (roomData: CreateDto): Promise<Response<RoomModel>> =>
    new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve({
          status: 201,
          data: {
            ...roomData,
            roomId: "newRoomId",
            roomDate: new Date().toISOString(),
            roomStatus: "closed",
          },
        });
      }, 500);
    }),

  update: (roomId: string, roomData: UpdateDto): Promise<Response<RoomModel>> =>
    new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve({
          status: 201,
          data: {
            ...roomData,
            roomId: roomId,
            roomDate: new Date().toISOString(),
            roomStatus: "closed",
            usuId: "sdfdsfvdvf",
          },
        });
      }, 500);
    }),

  findById: (roomId: string): Promise<Response<RoomModel>> =>
    new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve({
          status: 201,
          data: {
            roomId: roomId,
            roomName: "Sample Room",
            roomPassword: "12345",
            roomDate: "2023-10-01",
            roomStatus: "closed",
            usuId: "usu123",
          },
        });
      }, 500);
    }),
};
