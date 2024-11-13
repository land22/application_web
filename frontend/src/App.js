import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Inscription from './components/Inscription';
import Connexion from './components/Connexion';
import Dashboard from './components/Dashboard';

function App() {
  // Vérification du token dans localStorage
  const isAuthenticated = Boolean(localStorage.getItem('token')); // Vérifie si le token existe

  return (
    <Router>
      <Routes>
        {/* Redirection vers Dashboard ou Login */}
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        {/* La route du Dashboard qui nécessite d'être connecté */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        {/* Routes pour Inscription et Connexion */}
        <Route path="/register" element={<Inscription />} />
        <Route path="/login" element={<Connexion />} />
      </Routes>
    </Router>
  );
}

export default App;


