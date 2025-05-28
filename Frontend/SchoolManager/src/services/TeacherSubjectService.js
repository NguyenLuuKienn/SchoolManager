import axios from "axios";
const API_URL = "https://localhost:7274/api/TeacherSubject";
const getAllTeacherSubjects = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("Response data:", response.data);
    return response;
  } catch (err) {
    console.error("Error fetching teacher subjects:", err);
    throw err;
  }
}
const getTeacherBySubject = async (subjectId) => {
  return await axios.get(`${API_URL}/subject/${subjectId}`);
}
const getSubjectByTeacher = async (teacherId) => {
  return await axios.get(`${API_URL}/teacher/${teacherId}`);
}
const createTeacherSubject = async (teacherSubject) => {
  return await axios.post(API_URL, teacherSubject);
}

const updateTeacherSubject = async (teacherSubjectId, teacherSubject) => {
  return await axios.put(`${API_URL}/${teacherSubjectId}`, teacherSubject);
}

const deleteTeacherSubject = async (teacherSubjectId) => {
  return await axios.delete(`${API_URL}/${teacherSubjectId}`);
}
const teacherSubjectService = {
  getAllTeacherSubjects,
  getTeacherBySubject,
  getSubjectByTeacher,
  createTeacherSubject,
  updateTeacherSubject,
  deleteTeacherSubject
}
export default teacherSubjectService;