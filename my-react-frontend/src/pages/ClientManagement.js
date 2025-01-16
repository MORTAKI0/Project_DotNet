import React, { useState, useEffect } from "react";
import clientAPI from "../api/clientAPI";

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({ name: "" });

  const fetchClients = async () => {
    try {
      const data = await clientAPI.getAllClients();
      setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const handleCreateClient = async () => {
    try {
      await clientAPI.createClient(newClient);
      fetchClients();
    } catch (error) {
      console.error("Error creating client:", error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div>
      <h1>Client Management</h1>
      <div>
        <h2>Add Client</h2>
        <input
          placeholder="Client Name"
          value={newClient.name}
          onChange={(e) => setNewClient({ name: e.target.value })}
        />
        <button onClick={handleCreateClient}>Add Client</button>
      </div>
      <div>
        <h2>Clients</h2>
        {clients.map((client) => (
          <div key={client.clientId}>
            {client.name}
            <button onClick={() => console.log("Edit client logic")}>Edit</button>
            <button onClick={() => console.log("Delete client logic")}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientManagement;
