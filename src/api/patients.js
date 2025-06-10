import API from './index';

export const getPatients = () => API.get('/patients');
export const getPatient = (id) => API.get(`/patients/${id}`);
export const createPatient = (patientData) => API.post('/patients', patientData);
export const updatePatient = (id, patientData) => API.put(`/patients/${id}`, patientData);
export const deletePatient = (id) => API.delete(`/patients/${id}`);