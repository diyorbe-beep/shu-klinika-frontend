import API from './index';

export const getStudents = () => API.get('/students');
export const getStudent = (id) => API.get(`/students/${id}`);
export const createStudent = (studentData) => API.post('/students', studentData);
export const updateStudent = (id, studentData) => API.put(`/students/${id}`, studentData);
export const deleteStudent = (id) => API.delete(`/students/${id}`);
export const getParentByStudentId = (studentId) => API.get(`/parents/student/${studentId}`);