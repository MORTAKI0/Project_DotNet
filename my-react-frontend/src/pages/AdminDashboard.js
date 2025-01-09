import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [product, setProduct] = useState({
    name: '',
    reference: '',
    currentQuantity: 0,
    minThreshold: 0,
    price: 0,
    status: '',
    categoryId: null,
    supplierId: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5255/api/products', product, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert('Product added successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Failed to add product:', error);
      alert('Failed to add product.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admin Dashboard</h1>
      <p style={styles.description}>
        Welcome to the admin dashboard. You have access to administrative features.
      </p>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
          style={styles.input}
        />
        <input
          type="text"
          name="reference"
          value={product.reference}
          onChange={handleChange}
          placeholder="Reference"
          required
          style={styles.input}
        />
        <input
          type="number"
          name="currentQuantity"
          value={product.currentQuantity}
          onChange={handleChange}
          placeholder="Current Quantity"
          required
          style={styles.input}
        />
        <input
          type="number"
          name="minThreshold"
          value={product.minThreshold}
          onChange={handleChange}
          placeholder="Minimum Threshold"
          required
          style={styles.input}
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          required
          style={styles.input}
        />
        <input
          type="text"
          name="status"
          value={product.status}
          onChange={handleChange}
          placeholder="Status"
          required
          style={styles.input}
        />
        <input
          type="number"
          name="categoryId"
          value={product.categoryId}
          onChange={handleChange}
          placeholder="Category ID"
          style={styles.input}
        />
        <input
          type="number"
          name="supplierId"
          value={product.supplierId}
          onChange={handleChange}
          placeholder="Supplier ID"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Add Product</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '20px',
  },
  description: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '40px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#333',
    color: '#fff',
    cursor: 'pointer',
  }
};

export default AdminDashboard;