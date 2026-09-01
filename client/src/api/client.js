import axios from 'axios';
import { DEMO_USERS, generateMockToken } from './mockData';

// API base URL configuration (defaults to /api or localhost:5000/api)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000,
});

// Request Interceptor: Attach JWT Token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('samadhan_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Token Expiration
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Optional: Clear token if expired
      // localStorage.removeItem('samadhan_token');
      // localStorage.removeItem('samadhan_user');
    }
    return Promise.reject(error);
  }
);

/**
 * Authentication API Service with resilient Mock Fallback
 */
export const authApi = {
  async login(credentials) {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      return response.data;
    } catch (err) {
      console.warn('Real backend /api/auth/login failed or unreachable. Using mock authentication fallback.', err.message);

      // Check if credentials match one of our demo users
      const emailLower = credentials.email.toLowerCase().trim();
      let matchedUser = Object.values(DEMO_USERS).find(
        (u) => u.email.toLowerCase() === emailLower
      );

      // If user wasn't found by exact email, allow standard role based login or create mock user
      if (!matchedUser) {
        // Detect role from email or default to citizen
        let role = 'citizen';
        if (emailLower.includes('admin')) role = 'admin';
        else if (emailLower.includes('univ') || emailLower.includes('ac.in')) role = 'university';
        else if (emailLower.includes('ind') || emailLower.includes('corp')) role = 'industry';

        matchedUser = {
          id: `usr-custom-${Date.now()}`,
          name: credentials.email.split('@')[0].replace('.', ' ').toUpperCase(),
          email: credentials.email,
          role,
          organization: 'Jharkhand State Collaboration Unit',
          createdAt: new Date().toISOString(),
        };
      }

      const token = generateMockToken(matchedUser);
      return {
        token,
        user: matchedUser,
      };
    }
  },

  async register(userData) {
    try {
      const response = await apiClient.post('/auth/register', userData);
      return response.data;
    } catch (err) {
      console.warn('Real backend /api/auth/register failed or unreachable. Using mock register fallback.', err.message);

      const newUser = {
        id: `usr-${Date.now()}`,
        name: userData.name,
        email: userData.email,
        role: userData.role || 'citizen',
        phone: userData.phone || '',
        organization: userData.organization || (userData.role === 'citizen' ? 'Jharkhand Citizen' : 'Registered Entity'),
        district: userData.district || 'Ranchi',
        createdAt: new Date().toISOString(),
      };

      const token = generateMockToken(newUser);
      return {
        token,
        user: newUser,
      };
    }
  },

  async getMe() {
    try {
      const response = await apiClient.get('/auth/me');
      return response.data;
    } catch (err) {
      const storedUser = localStorage.getItem('samadhan_user');
      if (storedUser) {
        return JSON.parse(storedUser);
      }
      throw err;
    }
  },
};

export default apiClient;
