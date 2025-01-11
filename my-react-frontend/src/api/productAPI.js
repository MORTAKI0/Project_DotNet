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
        const response = await api.get('/Product');
        return response.data;
    },
    createProduct: async (product) => {
        const response = await api.post('/Product', product);
        return response.data;
    },
    updateProduct: async (id, product) => {
        const response = await api.put(`/Product/${id}`, product);
        return response.data;
    },
    deleteProduct: async (id) => {
        await api.delete(`/Product/${id}`);
    },
};

export default productAPI;
