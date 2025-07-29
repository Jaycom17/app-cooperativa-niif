import axiosInstance from "../../config/axios"

export const EsfPatrimonioService = {
    getEsfPatrimonioFormStudent: async () => {
        return axiosInstance.get("/esf-patrimonio/id");
    },
    updateAEsfPatrimonioFormStudent: async (data: any) => {
        return axiosInstance.put("/esf-patrimonio/id", data);
    },
    getEsfPatrimonioFormProfessor: async (stuID: string, roomID: string) => {
        return axiosInstance.get(`/esf-patrimonio/student/${stuID}/room/${roomID}`);
    }
}