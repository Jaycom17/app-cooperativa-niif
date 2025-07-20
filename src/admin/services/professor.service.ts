import type { UserModel } from "../models/User";

type ProfessorDTO = Omit<UserModel, "usuId">;

export const ProfessorService = {
  getProfessors: (): Promise<{ status: number; data: UserModel[] }> =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 200,
          data: [
            {
              usuId: "1",
              usuName: "John Doe",
              usuEmail: "john.doe@example.com",
            },
            {
              usuId: "2",
              usuName: "Jane Smith",
              usuEmail: "jane.smith@example.com",
            },
          ],
        });
      }, 1000);
    }),
  createProfessor: (professorData: ProfessorDTO): Promise<{ status: number }> =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ status: 200 });
      }, 1000);
    }),
  updateProfessor: (
    id: string,
    professorData: ProfessorDTO
  ): Promise<{ status: number }> =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ status: 200 });
      }, 1000);
    }),
};
