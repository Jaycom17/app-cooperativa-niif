// store/useRoomStore.ts
import { create } from "zustand";
import { validateRoom } from "../services/room.service";
import { Room, RoomInput } from "../types/room";

interface RoomState {
  currentRoom: Room | null;
  loading: boolean;
  roomError: string | null;
  initCheck: () => Promise<void>;
  checkRoom: (room: RoomInput) => Promise<void>;
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
      const res = await validateRoom({ roomPassword: roomData.roomPassword });

      if (!res.data.roomID) {
        localStorage.removeItem("room");
        set({ loading: false });
        return;
      }

      set({ currentRoom: res.data, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  checkRoom: async (room) => {
    try {
      const res = await validateRoom(room);
      if (!res.data.roomID) {
        set({ roomError: res.data.message || "Código de sala incorrecto" });
        return;
      }

      set({ currentRoom: res.data, roomError: null });
      localStorage.setItem("room", JSON.stringify(res.data));
    } catch (err) {
      console.error(err);
      set({ roomError: "Código de sala incorrecto" });

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
