import axios from 'axios';

const API_BASE_URL = 'http://localhost:5255'; // Backend URL

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add interceptor to include JWT token
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
        localStorage.setItem('jwtToken', response.data.token); // Store token
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const register = async (username, email, password) => {
    try {
        const response = await api.post('/api/auth/register', { username, email, password });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getProtectedData = async () => {
    try {
        const response = await api.get('/api/protected');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};