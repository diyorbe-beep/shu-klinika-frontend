import API from './index';

export const uploadFile = (formData) => API.post('/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});