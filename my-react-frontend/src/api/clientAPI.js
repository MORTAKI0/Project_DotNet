import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const clientAPI = {
  createClient: async (clientData) => {
    try {
      const response = await api.post("/Client/CreateClient", clientData);
      return response.data;
    } catch (error) {
      console.error("Error creating client:", error.response?.data || error.message);
      throw error;
    }
  },
  getClients: async () => {
    try {
      const response = await api.get("/Client/GetClients");
      return response.data;
    } catch (error) {
      console.error("Error fetching clients:", error.response?.data || error.message);
      throw error;
    }
  },
};

export default clientAPI;
