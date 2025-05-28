import axios from "axios";
const API_URL = "https://localhost:7274/api/Student";

const getAllStudents = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("Response data:", response.data);
    return response;
  } catch (err) {
    console.error("Error fetching students:", err);
    throw err;
  }
}
const getStudentById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
}
const createStudent = async (student) => {
  return await axios.post(API_URL, student);
}
const updateStudent = async (id, student) => {
  return await axios.put(`${API_URL}/${id}`, student);
}
const deleteStudent = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
}
const studentService = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
}
export default studentService;