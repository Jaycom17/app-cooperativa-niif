import axiosInstance from "@/config/axios";

export const getStudentsByRoom = async (roomId: string) => {
    try {
        const response = await axiosInstance.get(`/students/room/${roomId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching students by room:", error);
        throw error;
    }
};