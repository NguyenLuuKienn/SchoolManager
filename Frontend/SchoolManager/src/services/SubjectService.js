import axios from "axios";
const API_URL = "https://localhost:7274/api/Subject";
const getAllSubjects = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log("Response data:", response.data);
        return response;
    } catch (err) {
        console.error("Error fetching subjects:", err);
        throw err;
    }
}
const getSubjectById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
}
const createSubject = async (subjectData) => {
    return await axios.post(API_URL, subjectData);
}
const updateSubject = async (subjectId, subjectData) => {
    return await axios.put(`${API_URL}/${subjectId}`, subjectData);
}
const deleteSubject = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
}
const subjectService = {
    getAllSubjects,
    getSubjectById,
    createSubject,
    updateSubject,
    deleteSubject
}
export default subjectService;