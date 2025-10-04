import { create } from "zustand";

interface Status {
  show: boolean;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  setStatus: (status: Omit<Status, 'setStatus'>) => void;
}

export const useStatusStore = create<Status>((set) => ({
  show: false,
  title: "",
  message: "",
  type: "info",
  setStatus: (status: Omit<Status, 'setStatus'>) => set(status),
}));
