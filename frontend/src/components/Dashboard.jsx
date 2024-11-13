import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Vérifiez si un token est présent dans le stockage local pour déterminer l'état de connexion
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Si le token est présent, `isLoggedIn` sera `true`
    }, []);

    const handleLogout = () => {
        // Supprimez le token pour déconnecter l'utilisateur
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login'); // Redirige vers la page de connexion
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h4>Bienvenue sur votre tableau de bord</h4>
                        </div>
                        <div className="card-body">
                            <p>Voici votre contenu personnalisé, vous êtes connecté !</p>
                            {isLoggedIn ? (
                                <button onClick={handleLogout} className="btn btn-danger">Se déconnecter</button>
                            ) : (
                                <a href="/login" className="btn btn-primary">Se connecter</a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

