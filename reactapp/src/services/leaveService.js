import axios from 'axios';

const API_URL = 'https://8080-bdecbfeafecccdbcbeeaefdcadcfebaceabaa.premiumproject.examly.io/leaves';

const handleResponse = (response) => {
 if (response && response.data) {
  return response;
 }
 return Promise.reject('Invalid response format');
};

const handleError = (error) => {
 console.error('API call failed:', error);
 return Promise.reject(error);
};

export const getAllLeaves = (page = 0, size = 5) => {
 return axios.get(`${API_URL}/page?page=${page}&size=${size}`).then(handleResponse).catch(handleError);
};

export const getLeaveById = (id) => {
 return axios.get(`${API_URL}/${id}`).then(handleResponse).catch(handleError);
};

export const addLeave = (leave) => {
 return axios.post(API_URL, leave).then(handleResponse).catch(handleError);
};

export const updateLeave = (id, leave) => {
 return axios.put(`${API_URL}/${id}`, leave).then(handleResponse).catch(handleError);
};

export const deleteLeave = (id) => {
 return axios.delete(`${API_URL}/${id}`).then(handleResponse).catch(handleError);
};

export const approveLeave = (id) => {
 return axios.put(`${API_URL}/${id}/approve`).then(handleResponse).catch(handleError);
};

export const rejectLeave = (id) => {
 return axios.put(`${API_URL}/${id}/reject`).then(handleResponse).catch(handleError);
};

