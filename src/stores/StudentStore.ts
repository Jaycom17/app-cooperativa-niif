// store/useStudentStore.ts
import { create } from "zustand";
import { LoginService } from "../auth/services/login.service";
import { StudentService } from "../student/services/student.service";
import type { StudentModel } from "../student/models/Student";

interface StudentDTO {
  stuCedula: string;
  roomID: string;
  usuRole: string;
}

interface StudentState {
  student: StudentDTO | null;
  loading: boolean;
  studentError: string | null;
  studentProfile: () => Promise<void>;
  checkStudent: (student: StudentModel) => Promise<void>;
  sStudent: (cedula: string) => Promise<void>;
  logout: () => Promise<boolean>;
}

export const useStudentStore = create<StudentState>((set) => ({
  student: null,
  loading: true,
  studentError: null,

  studentProfile: async () => {
    try {
      const res = await LoginService.studentProfile();

      set({ student: res.data, loading: false });
    } catch {
      set({
        student: null,
        loading: false,
        studentError: null
      });
    }
  },

  checkStudent: async (studentData) => {
    try {
      const room = localStorage.getItem("room");

      if (!room) {
        set({ studentError: "No hay sala activa" });
        return;
      }

      const { roomID } = JSON.parse(room);
      if (!roomID) {
        set({ studentError: "No hay sala activa" });
        return;
      }

      const res = await StudentService.createStudent({
        ...studentData,
        roomID,
      });

      set({ student: res, studentError: null, loading: false });
    } catch (error: any) {
      set({
        studentError:
          error?.response?.data?.message || "Error al crear el estudiante",
        loading: false,
      });

      setTimeout(() => set({ studentError: null }), 5000);
    }
  },

  sStudent: async (cedula) => {
    try {
      const room = localStorage.getItem("room");

      if (!room) {
        set({ studentError: "No hay sala activa" });
        return;
      }
      const { roomID } = JSON.parse(room);

      if (!roomID) {
        set({ studentError: "No hay sala activa" });
        return;
      }

      const stu = await StudentService.getStudentByCedulaRoom(cedula, roomID);

      if (!stu) {
        set({ studentError: "Estudiante no encontrado" });
        return;
      }

      set({ student: stu, studentError: null, loading: false });

    } catch (error: any) {
      set({
        studentError:
          error?.response?.data?.message || "Estudiante no encontrado",
              loading: false,
      });

      setTimeout(() => set({ studentError: null }), 5000);
    }
  },

  logout: async () => {
    try {
      await LoginService.logout();
      localStorage.removeItem("room");
      set({ student: null, loading: false, studentError: null });
      return true;
    } catch{
      set({ student: null });

      return false;
    }
  },
}));
