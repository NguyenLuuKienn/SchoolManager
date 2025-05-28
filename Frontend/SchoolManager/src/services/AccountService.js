import axios from "axios";
const API_URL = "https://localhost:7274/api/Account";
const getAllAccounts = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log("Response data:", response.data);
        return response;
    } catch (err) {
        console.error("Error fetching accounts:", err);
        throw err;
    }
}
const getAccountById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
}
const createAccount = async (accountData) => {
    return await axios.post(API_URL, accountData);
}
const updateAccount = async (id, accountData) => {
    return await axios.put(`${API_URL}/${id}`, accountData);
}
const deleteAccount = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
}
const accountService = {
    getAllAccounts,
    getAccountById,
    createAccount,
    updateAccount,
    deleteAccount
}
export default accountService;