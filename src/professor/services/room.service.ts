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
  delete: (roomId: string): Promise<Response<{ message: string }>> =>
    new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve({
          status: 200,
          data: { message: "Sala eliminada" },
        });
      }, 500);
    }),
  findAll: (): Promise<Response<RoomModel[]>> =>
    new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve({
          status: 200,
          data: [
            {
              roomId: "1",
              roomName: "Sala A",
              roomPassword: "1234",
              roomDate: "2023-10-01",
              roomStatus: "open",
              usuId: "usu123",
            },
            {
              roomId: "2",
              roomName: "Sala B",
              roomPassword: "5678",
              roomDate: "2023-10-02",
              roomStatus: "closed",
              usuId: "usu456",
            },
            // Add more rooms as needed
          ],
        });
      }, 300);
    }),
  updateRoomState: (roomData: { roomStatus: string }, roomId: string) =>
    // Simulate an API call to update the room state
    new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve({ status: 201, data: { ...roomData, roomId: roomId } });
      }, 1000);
    }),
};
