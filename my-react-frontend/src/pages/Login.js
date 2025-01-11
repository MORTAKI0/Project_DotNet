import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/api'; // Correct path to api.js

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await login(credentials.username, credentials.password);
            if (response.succeeded) {
                localStorage.setItem('userRole', response.role);
                if (response.role === 'Admin') navigate('/admin/dashboard');
                else navigate('/dashboard');
            }
        } catch (err) {
            setError(err.message || 'An error occurred during login');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                {error && <div className="text-red-500">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={credentials.username}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={handleInputChange}
                        required
                    />
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
