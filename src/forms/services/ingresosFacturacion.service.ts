import axiosInstance from "@/config/axios"

export const IngresosFacturacionService = {
    getIngresosFacturacionForStudent: async () => {
        return axiosInstance.get("/ing-fact/id");
    },
    updateIngresosFacturacionForStudent: async (data: any) => {
        return axiosInstance.put("/ing-fact/id", data);
    },
    getIngresosFacturacionForProfessor: async (stuID: string, roomID: string) => {
        return axiosInstance.get(`/ing-fact/student/${stuID}/room/${roomID}`);
    }
}