// store/useRoomStore.ts
import { create } from "zustand";
import { RoomService } from "../professor/services/room.service";


interface currentRoom {
  roomID: string;
}

interface RoomState {
  currentRoom: currentRoom | null;
  loading: boolean;
  roomError: string | null;
  initCheck: () => Promise<void>;
  checkRoom: (room: { roomPassword: string }) => Promise<void>;
  leaveRoom: () => void;
}

export const useRoomStore = create<RoomState>((set) => ({
  currentRoom: null,
  loading: true,
  roomError: null,

  initCheck: async () => {
    try {
      const stored = localStorage.getItem("room");
      if (!stored) {
        set({ loading: false });
        return;
      }

      const roomData = JSON.parse(stored);
      const res = await RoomService.validatePassword(roomData.roomPassword);

      if (!res.roomID) {
        localStorage.removeItem("room");
        set({ loading: false });
        return;
      }

      set({ currentRoom: res, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  checkRoom: async (roomInput) => {
    try {
      const room = await RoomService.validatePassword(roomInput.roomPassword);
      console.log(room)

      set({ currentRoom: room, roomError: null });
      localStorage.setItem("room", JSON.stringify(room));
    } catch (err: any) {
      set({ roomError: err.response.data.error.message || "Código de sala incorrecto" });

      setTimeout(() => {
        set({ roomError: null });
      }, 5000);
    }
  },

  leaveRoom: () => {
    localStorage.removeItem("room");
    set({ currentRoom: null });
  },
}));
