import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import ClientManagement from "./pages/ClientManagement";
import ClientDashboard from "./pages/ClientDashboard"; // Add your Client Dashboard page

// A ProtectedRoute component for role-based redirection
const ProtectedRoute = ({ role, requiredRole, redirectTo, children }) => {
    if (role !== requiredRole) {
        return <Navigate to={redirectTo} />;
    }
    return children;
};

const App = () => {
    const userRole = localStorage.getItem("userRole"); // Get the user role from localStorage

    return (
        <Router>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Admin routes */}
                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute role={userRole} requiredRole="Admin" redirectTo="/login">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/clients"
                    element={
                        <ProtectedRoute role={userRole} requiredRole="Admin" redirectTo="/login">
                            <ClientManagement />
                        </ProtectedRoute>
                    }
                />

                {/* Client routes */}
                <Route
                    path="/client/dashboard"
                    element={
                        <ProtectedRoute role={userRole} requiredRole="Client" redirectTo="/login">
                            <ClientDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Catch-all route for unauthorized access */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
