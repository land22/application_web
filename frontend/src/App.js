import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Inscription from './components/Inscription';
import Connexion from './components/Connexion';
import Dashboard from './components/Dashboard';

function App() {
  // État pour suivre si l'utilisateur est authentifié
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem('token')));

  // Vérification du token dans localStorage et mise à jour de l'état
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []); // Ce useEffect s'exécute uniquement lors du premier rendu

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
        <Route path="/login" element={<Connexion setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
    </Router>
  );
}

export default App;
