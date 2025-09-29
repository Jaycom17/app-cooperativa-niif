import axiosInstance from "@/config/axios"

export const RentaLiquidaService = {
    getRentaLiquidaForStudent: async () => {
        return axiosInstance.get("/renta-liquida/id");
    },
    updateRentaLiquidaForStudent: async (data: any) => {
        return axiosInstance.put("/renta-liquida/id", data);
    },
    getRentaLiquidaForProfessor: async (stuID: string, roomID: string) => {
        return axiosInstance.get(`/renta-liquida/student/${stuID}/room/${roomID}`);
    }
}