export interface RoomModel {
  roomId: string;
  roomName: string;
  roomPassword: string;
  roomDate: string;
  roomStatus: "open" | "closed";
  usuId: string;
}
