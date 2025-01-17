import React, { useState, useEffect } from "react";
import clientAPI from "../api/clientAPI";

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const fetchClients = async () => {
    try {
      const data = await clientAPI.getClients();
      setClients(data || []);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch clients:", err);
      setError("Failed to fetch clients.");
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleAddClient = async (e) => {
    e.preventDefault();
    try {
      await clientAPI.createClient(newClient);
      setNewClient({ firstName: "", lastName: "", email: "", password: "" });
      fetchClients();
      setSuccessMessage("Client created successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error("Failed to create client:", err);
      setError("Failed to create client.");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Client Management</h1>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {successMessage && <p style={{ color: "green", textAlign: "center" }}>{successMessage}</p>}

      <div style={{ marginBottom: "20px" }}>
        <h2>Add New Client</h2>
        <form onSubmit={handleAddClient} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="First Name"
            value={newClient.firstName}
            onChange={(e) => setNewClient({ ...newClient, firstName: e.target.value })}
            required
            style={{ padding: "8px", flex: "1" }}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={newClient.lastName}
            onChange={(e) => setNewClient({ ...newClient, lastName: e.target.value })}
            required
            style={{ padding: "8px", flex: "1" }}
          />
          <input
            type="email"
            placeholder="Email"
            value={newClient.email}
            onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
            required
            style={{ padding: "8px", flex: "1" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={newClient.password}
            onChange={(e) => setNewClient({ ...newClient, password: e.target.value })}
            required
            style={{ padding: "8px", flex: "1" }}
          />
          <button type="submit" style={{ padding: "10px 15px", backgroundColor: "#007bff", color: "#fff" }}>
            Add Client
          </button>
        </form>
      </div>

      <h2>Clients</h2>
      {clients.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>First Name</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Last Name</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{client.firstName}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{client.lastName}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{client.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No clients found.</p>
      )}
    </div>
  );
};

export default ClientManagement;
