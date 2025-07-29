import axiosInstance from "../../config/axios"

export const CaratulaService = {
    getCaratulaForStudent: async () => {
        return axiosInstance.get("/caratulas/id");
    },
    updateCaratulaForStudent: async (data: any) => {
        return axiosInstance.put("/caratulas/id", data);
    },
    getCaratulaForProfessor: async (stuID: string, roomID: string) => {
        return axiosInstance.get(`/caratulas/student/${stuID}/room/${roomID}`);
    }
}