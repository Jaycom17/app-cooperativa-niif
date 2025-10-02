import type { UserModel } from "@/admin/models/User";
import axiosInstance from "@/config/axios";

type ProfessorDTO = Omit<UserModel, "usuID">;

export const ProfessorService = {
  getProfessors: async (): Promise<UserModel[]> => {
    const response = await axiosInstance.get("/users/professor");
    return response.data;
  },
  createProfessor: (professorData: ProfessorDTO): Promise<void> => {
    return axiosInstance.post("/users/professor", professorData);
  },
  updateProfessor: (id: string, professorData: ProfessorDTO): Promise<void> => {
    return axiosInstance.put(`/users/professor/${id}`, professorData);
  },
  //TODO: verificar si esa es la ruta correcta
  deleteProfessor: (id: string): Promise<void> => {
    return axiosInstance.delete(`/users/${id}`);
  },
};
