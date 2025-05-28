import axios from "axios";
const API_URL = "https://localhost:7274/api/Class";

const getAllClasses = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log("Response data:", response.data);
        return response;
    } catch (err) {
        console.error("Error fetching classes:", err);
        throw err;
    }
}
const getClassById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
}
const createClass = async (classData) => {
    return await axios.post(API_URL, classData);
}
const updateClass = async (id, classData) => {
    return await axios.put(`${API_URL}/${id}`, classData);
}
const deleteClass = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
}
const classService = {
    getAllClasses,
    getClassById,
    createClass,
    updateClass,
    deleteClass
}
export default classService;