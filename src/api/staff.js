import API from './index';

export const getStaff = () => API.get('/staff');
export const getStaffMember = (id) => API.get(`/staff/${id}`);
export const createStaff = (staffData) => API.post('/staff', staffData);
export const updateStaff = (id, staffData) => API.put(`/staff/${id}`, staffData);
export const deleteStaff = (id) => API.delete(`/staff/${id}`);