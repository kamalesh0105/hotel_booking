import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
              <h1 className="text-3xl font-bold text-gray-800">Welcome to your Dashboard!</h1>
            </div>
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

export default App;
