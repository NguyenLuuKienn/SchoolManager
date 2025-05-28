import axios from "axios";
const API_URL = "https://localhost:7274/api/Role";
const getAllRoles = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log("Response data:", response.data);
        return response;
    } catch (err) {
        console.error("Error fetching roles:", err);
        throw err;
    }
}
const getRoleById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
}
const createRole = async (roleData) => {
    return await axios.post(API_URL, roleData);
}
const updateRole = async (id, roleData) => {
    return await axios.put(`${API_URL}/${id}`, roleData);
}
const deleteRole = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
}
const roleService = {
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
}
export default roleService;
