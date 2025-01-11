import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add interceptor to include JWT token in requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = async (username, password) => {
    try {
        const response = await api.post('/api/auth/login', { username, password });
        localStorage.setItem('jwtToken', response.data.token); // Store the token
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'An error occurred during login' };
    }
};

export const register = async (username, email, password) => {
    try {
        const response = await api.post('/api/auth/register', { username, email, password });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'An error occurred during registration' };
    }
};

export const getProtectedData = async () => {
    try {
        const response = await api.get('/api/protected');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch data' };
    }
};
