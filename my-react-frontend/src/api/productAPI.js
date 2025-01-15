import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const productAPI = {
    getAllProducts: async () => {
        try {
            const response = await api.get('/Product');
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error.response?.data || error.message);
            throw error;
        }
    },
    createProduct: async (product) => {
        try {
            const response = await api.post('/Product', product);
            return response.data;
        } catch (error) {
            console.error('Error creating product:', error.response?.data || error.message);
            throw error;
        }
    },
    getAllSuppliers: async () => {
        try {
            const response = await api.get('/Supplier');
            return response.data;
        } catch (error) {
            console.error('Error fetching suppliers:', error.response?.data || error.message);
            throw error;
        }
    },
    createSupplier: async (supplier) => {
        try {
            const response = await api.post('/Supplier', supplier);
            return response.data;
        } catch (error) {
            console.error('Error creating supplier:', error.response?.data || error.message);
            throw error;
        }
    },
};

export default productAPI;
