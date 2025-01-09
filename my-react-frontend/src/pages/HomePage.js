import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to My App</h1>
      <p style={styles.description}>
        This is a simple and powerful application built with React and .NET.
      </p>
      <button style={styles.button} onClick={() => navigate('/login')}>
        Get Started
      </button>
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
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default HomePage;