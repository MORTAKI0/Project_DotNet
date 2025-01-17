import React, { useState, useEffect } from "react";
import productAPI from "../api/productAPI";
import clientAPI from "../api/clientAPI"; // Import the client API

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [clients, setClients] = useState([]); // Add clients state
  const [newProduct, setNewProduct] = useState({
    name: "",
    reference: "",
    currentQuantity: 0,
    minThreshold: 0,
    price: 0,
    isFinal: false,
    supplierId: "",
  });
  const [newSupplier, setNewSupplier] = useState({ name: "" });
  const [newClient, setNewClient] = useState({ // Add newClient state
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch data for products, suppliers, and clients
  const fetchData = async () => {
    try {
      const productsData = await productAPI.getAllProducts();
      const suppliersData = await productAPI.getAllSuppliers();
      const clientsData = await clientAPI.getClients(); // Fetch clients
      setProducts(productsData || []);
      setSuppliers(suppliersData || []);
      setClients(clientsData || []); // Set clients
      setError(null); // Clear errors on success
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setError("Failed to fetch data. Check API or server.");
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Handle new product creation
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await productAPI.createProduct(newProduct);
      setNewProduct({
        name: "",
        reference: "",
        currentQuantity: 0,
        minThreshold: 0,
        price: 0,
        isFinal: false,
        supplierId: "",
      });
      fetchData(); // Refresh data
      setSuccessMessage("Product added successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error("Error adding product:", err);
      setError("Failed to add product.");
    }
  };

  // Handle new supplier creation
  const handleAddSupplier = async (e) => {
    e.preventDefault();
    try {
      await productAPI.createSupplier(newSupplier);
      setNewSupplier({ name: "" });
      fetchData(); // Refresh data
      setSuccessMessage("Supplier added successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error("Error adding supplier:", err);
      setError("Failed to add supplier.");
    }
  };

  // Handle new client creation
  const handleAddClient = async (e) => {
    e.preventDefault();
    try {
      await clientAPI.createClient(newClient);
      setNewClient({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      fetchData(); // Refresh data
      setSuccessMessage("Client added successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error("Error adding client:", err);
      setError("Failed to add client.");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Admin Dashboard</h1>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {successMessage && <p style={{ color: "green", textAlign: "center" }}>{successMessage}</p>}

      {/* Add New Product Section */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Add New Product</h2>
        <form onSubmit={handleAddProduct} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            required
            style={{ padding: "8px", flex: "1" }}
          />
          <input
            type="text"
            placeholder="Reference"
            value={newProduct.reference}
            onChange={(e) => setNewProduct({ ...newProduct, reference: e.target.value })}
            required
            style={{ padding: "8px", flex: "1" }}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newProduct.currentQuantity}
            onChange={(e) => setNewProduct({ ...newProduct, currentQuantity: parseInt(e.target.value) })}
            required
            style={{ padding: "8px", flex: "1" }}
          />
          <input
            type="number"
            placeholder="Threshold"
            value={newProduct.minThreshold}
            onChange={(e) => setNewProduct({ ...newProduct, minThreshold: parseInt(e.target.value) })}
            required
            style={{ padding: "8px", flex: "1" }}
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
            required
            style={{ padding: "8px", flex: "1" }}
          />
          <select
            value={newProduct.supplierId}
            onChange={(e) => setNewProduct({ ...newProduct, supplierId: parseInt(e.target.value) })}
            required
            style={{ padding: "8px", flex: "1" }}
          >
            <option value="">Select Supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier.supplierId} value={supplier.supplierId}>
                {supplier.name}
              </option>
            ))}
          </select>
          <label>
            <input
              type="checkbox"
              checked={newProduct.isFinal}
              onChange={(e) => setNewProduct({ ...newProduct, isFinal: e.target.checked })}
            />
            Final
          </label>
          <button type="submit" style={{ padding: "10px 15px", backgroundColor: "#007bff", color: "#fff" }}>
            Add Product
          </button>
        </form>
      </div>

      {/* Add New Supplier Section */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Add New Supplier</h2>
        <form onSubmit={handleAddSupplier} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Supplier Name"
            value={newSupplier.name}
            onChange={(e) => setNewSupplier({ name: e.target.value })}
            required
            style={{ padding: "8px", flex: "1" }}
          />
          <button type="submit" style={{ padding: "10px 15px", backgroundColor: "#28a745", color: "#fff" }}>
            Add Supplier
          </button>
        </form>
      </div>

      {/* Add New Client Section */}
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
          <button type="submit" style={{ padding: "10px 15px", backgroundColor: "#17a2b8", color: "#fff" }}>
            Add Client
          </button>
        </form>
      </div>

      {/* Products Table */}
      <h2>Products</h2>
      {products.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Reference</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Quantity</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Price</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Final</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Supplier</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.productId}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.productId}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.name}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.reference}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.currentQuantity}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.price}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.isFinal ? "Yes" : "No"}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.supplier?.name || "None"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
