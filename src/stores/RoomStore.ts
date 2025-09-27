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
  initCheck: () => void;
  checkRoom: (room: { roomPassword: string }) => Promise<void>;
  leaveRoom: () => void;
}

export const useRoomStore = create<RoomState>((set) => ({
  currentRoom: null,
  loading: true,
  roomError: null,

  initCheck: () => {
    try {
      const stored = localStorage.getItem("room");

      if (!stored) {
        set({ loading: false, currentRoom: null });
        return;
      }

      const roomData = JSON.parse(stored);

      if (!roomData.roomID) {
        localStorage.removeItem("room");
        set({ loading: false, currentRoom: null });
        return;
      }

      set({ currentRoom: roomData, loading: false });
    } catch {
      set({ loading: false, currentRoom: null });
    }
  },

  checkRoom: async (roomInput) => {
    try {
      const room = await RoomService.validatePassword(roomInput.roomPassword);

      set({ currentRoom: room, roomError: null, loading: false });

      localStorage.setItem("room", JSON.stringify(room));
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: { message?: string } } } };
      set({ roomError: error.response?.data?.error?.message || "Código de sala incorrecto", loading: false });

      setTimeout(() => {
        set({ roomError: null });
      }, 5000);
    }
  },

  leaveRoom: () => {
    localStorage.removeItem("room");
    set({ currentRoom: null, loading: false, roomError: null });
  },
}));
