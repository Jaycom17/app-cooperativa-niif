import axiosInstance from "@/config/axios"
import type { StudentModel } from "@/student/models/Student";

type StudentDTO =  StudentModel & { roomID: string };

export const StudentService = {
    createStudent: async (studentData: StudentDTO) => {
        const response = await axiosInstance.post('/students', studentData);
        return response.data;
    },
    getStudentByCedulaRoom: async (cedula: string, roomID: string) => {
        const response = await axiosInstance.get(`/students/search/${cedula}/${roomID}`);
        return response.data;
    }
}