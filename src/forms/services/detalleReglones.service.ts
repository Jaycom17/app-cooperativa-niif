import axiosInstance from "../../config/axios"

export const DetalleReglonesService = {
    getDetalleReglonesFormStudent: async () => {
        return axiosInstance.get("/detalle-renglones/id");
    },
    updateADetalleReglonesFormStudent: async (data: any) => {
        return axiosInstance.put("/detalle-renglones/id", data);
    },
    getDetalleReglonesFormProfessor: async (stuID: string, roomID: string) => {
        return axiosInstance.get(`/detalle-renglones/student/${stuID}/room/${roomID}`);
    }
}