import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const clientAPI = {
  getAllClients: async () => {
    try {
      const response = await api.get("/Client");
      return response.data;
    } catch (error) {
      console.error("Error fetching clients:", error.response?.data || error.message);
      throw error;
    }
  },
  createClient: async (client) => {
    try {
      const response = await api.post("/Client", client);
      return response.data;
    } catch (error) {
      console.error("Error creating client:", error.response?.data || error.message);
      throw error;
    }
  },
  updateClient: async (id, client) => {
    try {
      const response = await api.put(`/Client/${id}`, client);
      return response.data;
    } catch (error) {
      console.error("Error updating client:", error.response?.data || error.message);
      throw error;
    }
  },
  deleteClient: async (id) => {
    try {
      const response = await api.delete(`/Client/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting client:", error.response?.data || error.message);
      throw error;
    }
  },
};

export default clientAPI;
