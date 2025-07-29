import axiosInstance from "../../config/axios"

export const ActivosFijosService = {
    getActivosFijosFormStudent: async () => {
        return axiosInstance.get("/activos-fijos/id");
    },
    updateACtivosFijosFormStudent: async (data: any) => {
        return axiosInstance.put("/activos-fijos/id", data);
    },
    getActivosFijosFormProfessor: async (stuID: string, roomID: string) => {
        return axiosInstance.get(`/activos-fijos/student/${stuID}/room/${roomID}`);
    }
}