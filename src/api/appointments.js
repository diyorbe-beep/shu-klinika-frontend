import API from './index';

export const getAppointments = () => API.get('/appointments');
export const getAppointment = (id) => API.get(`/appointments/${id}`);
export const createAppointment = (appointmentData) => API.post('/appointments', appointmentData);
export const updateAppointment = (id, appointmentData) => API.put(`/appointments/${id}`, appointmentData);
export const deleteAppointment = (id) => API.delete(`/appointments/${id}`);