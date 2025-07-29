import axiosInstance from "../../config/axios"

export const ResumenESFService = {
    getResumenESFForStudent: async () => {
        return axiosInstance.get("/resumen-esf/id");
    },
    updateResumenESFForStudent: async (data: any) => {
        return axiosInstance.put("/resumen-esf/id", data);
    },
    getResumenESFForProfessor: async (stuID: string, roomID: string) => {
        return axiosInstance.get(`/resumen-esf/student/${stuID}/room/${roomID}`);
    }
}