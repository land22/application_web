import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Inscription from './components/Inscription';
import Connexion from './components/Connexion';
import Dashboard from './components/Dashboard';

function App() {
  const isAuthenticated = localStorage.getItem('token');
  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        <Route path="/register" element={<Inscription />} />
        <Route path="/login" element={<Connexion />} />
      </Routes>
    </Router>
  );
}

export default App;

