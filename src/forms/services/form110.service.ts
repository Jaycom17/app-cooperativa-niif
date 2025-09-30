import axiosInstance from "@/config/axios"

export const Form110Service = {
    getForm110ForStudent: async () => {
        return axiosInstance.get("/form-110/id");
    },
    updateForm110ForStudent: async (data: any) => {
        return axiosInstance.put("/form-110/id", data);
    },
    getForm110ForProfessor: async (stuID: string, roomID: string) => {
        return axiosInstance.get(`/form-110/student/${stuID}/room/${roomID}`);
    }
}