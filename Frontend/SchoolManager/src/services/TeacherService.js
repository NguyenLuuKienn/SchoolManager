import axios from "axios";
const API_URL = "https://localhost:7274/api/Teacher";
const getAllTeachers = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log("Response data:", response.data);
        return response;
    } catch (err) {
        console.error("Error fetching teachers:", err);
        throw err;
    }
}
const getTeacherById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
}
const createTeacher = async (teacherData) => {
    return await axios.post(API_URL, teacherData);
}
const updateTeacher = async (teacherId, teacherData) => {
    return await axios.put(`${API_URL}/${teacherId}`, teacherData);
}
const deleteTeacher = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
}
const teacherService = {
    getAllTeachers,
    getTeacherById,
    createTeacher,
    updateTeacher,
    deleteTeacher
}
export default teacherService;