import axios from 'axios';

// Prefer proxy during dev to avoid CORS; fall back to explicit base URL if provided
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    
    // Handle network errors
    if (!error.response) {
      console.error('Network Error:', error.message);
      throw new Error('Network error. Please check if the backend server is running.');
    }
    
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  // User registration
  signup: async (userData) => {
    const response = await api.post('/user/signup', userData);
    return response.data;
  },

  // User login
  login: async (aadharCardNumber, password) => {
    const response = await api.post('/user/login', {
      aadharCardNumber,
      password,
    });
    return response.data;
  },

  // Get user profile
  getProfile: async () => {
    const response = await api.get('/user/profile');
    return response.data;
  },

  // Update password
  updatePassword: async (currentPassword, newPassword) => {
    const response = await api.put('/user/profile/password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },
};

// Candidate API
export const candidateAPI = {
  // Get all candidates
  getCandidates: async () => {
    const response = await api.get('/candidate');
    return response.data;
  },

  // Add new candidate (Admin only)
  addCandidate: async (candidateData) => {
    const response = await api.post('/candidate', candidateData);
    return response.data;
  },

  // Update candidate (Admin only)
  updateCandidate: async (candidateId, candidateData) => {
    const response = await api.put(`/candidate/${candidateId}`, candidateData);
    return response.data;
  },

  // Delete candidate (Admin only)
  deleteCandidate: async (candidateId) => {
    const response = await api.delete(`/candidate/${candidateId}`);
    return response.data;
  },

  // Vote for candidate
  voteForCandidate: async (candidateId) => {
    const response = await api.post(`/candidate/vote/${candidateId}`);
    return response.data;
  },

  // Get vote count
  getVoteCount: async () => {
    const response = await api.get('/candidate/vote/count');
    return response.data;
  },
};

// Settings API
export const settingsAPI = {
  getResultsVisibility: async () => {
    const response = await api.get('/settings/results-visibility');
    return response.data;
  },
  setResultsVisibility: async (visible) => {
    const response = await api.put('/settings/results-visibility', { visible });
    return response.data;
  }
};

export default api;
