// store/useStudentStore.ts
import { create } from "zustand";
import { studentProfile, logoutStudent } from "../services/login.service";
import { createStudent, searchStudent } from "../services/student.service";
import { Student, StudentInput } from "../types/student";

interface StudentState {
  student: Student | null;
  loading: boolean;
  studentError: string | null;
  initStudent: () => Promise<void>;
  checkStudent: (student: StudentInput) => Promise<void>;
  sStudent: (cedula: string) => Promise<void>;
  logout: () => boolean;
}

export const useStudentStore = create<StudentState>((set) => ({
  student: null,
  loading: true,
  studentError: null,

  initStudent: async () => {
    try {
      const res = await studentProfile();

      if (res.statusText !== "OK") {
        set({ loading: false });
        return;
      }

      set({ student: res.data, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  checkStudent: async (studentData) => {
    try {
      const room = localStorage.getItem("room");
      if (!room) throw new Error("No hay sala activa");

      const roomID = JSON.parse(room).roomID;

      const res = await createStudent({ ...studentData, roomID });

      if (res.statusText !== "Created") return;

      set({ student: res.data, studentError: null });
    } catch (error: any) {
      set({
        studentError:
          error?.response?.data?.message || "Error al crear el estudiante",
      });

      setTimeout(() => set({ studentError: null }), 5000);
    }
  },

  sStudent: async (cedula) => {
    try {
      const room = localStorage.getItem("room");
      if (!room) throw new Error("No hay sala activa");

      const roomID = JSON.parse(room).roomID;

      const res = await searchStudent(cedula, roomID);

      if (res.statusText !== "OK") return;

      set({ student: res.data, studentError: null });
    } catch (error: any) {
      set({
        studentError:
          error?.response?.data?.message || "Estudiante no encontrado",
      });

      setTimeout(() => set({ studentError: null }), 5000);
    }
  },

  logout: () => {
    const result = logoutStudent();

    if (!result) return false;

    set({ student: null, loading: false });
    return true;
  },
}));
