import axiosInstance from "../../config/axios"

export const ImpuestoDiferidoService = {
    getImpuestoDiferidoForStudent: async () => {
        return axiosInstance.get("/impuesto-diferido/id");
    },
    updateImpuestoDiferidoForStudent: async (data: any) => {
        return axiosInstance.put("/impuesto-diferido/id", data);
    },
    getImpuestoDiferidoForProfessor: async (stuID: string, roomID: string) => {
        return axiosInstance.get(`/impuesto-diferido/student/${stuID}/room/${roomID}`);
    }
}