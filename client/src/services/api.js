import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor
API.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor
API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export const todoService = {
  getAll: (params) => API.get('/todos', { params }),
  getById: (id) => API.get(`/todos/${id}`),
  create: (data) => API.post('/todos', data),
  update: (id, data) => API.put(`/todos/${id}`, data),
  toggle: (id) => API.patch(`/todos/${id}/toggle`),
  delete: (id) => API.delete(`/todos/${id}`),
  clearCompleted: () => API.delete('/todos/completed/clear'),
};
