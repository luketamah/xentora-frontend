import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

const api = axios.create({
  baseURL: API_BASE,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const leadApi = {
  create: (data) => api.post('/leads', data),
  getAll: () => api.get('/leads'),
  updateStatus: (id, status) => api.patch(`/leads/${id}/status`, { status }),
};

export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  me: () => api.get('/auth/me'),
};

export const chatApi = {
  send: (message, sessionId) => api.post('/chat', { message, session_id: sessionId }),
};

export const analyticsApi = {
  get: () => api.get('/analytics'),
};

export default api;
