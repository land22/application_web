import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate
//import '../styles/connexion.css';

const Connexion = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); // Renommé motDePasse en password
    const navigate = useNavigate(); // Utilisez useNavigate pour la redirection

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Envoi de la requête avec les informations de connexion
            const response = await axios.post('http://localhost:8000/api/login', {
                email,
                password,
            });

            // Vérification si le token est dans la réponse
            if (response.data.token) {
                // Stocker le token dans le localStorage
                localStorage.setItem('token', response.data.token);
                // Rediriger vers le dashboard
                navigate('/dashboard');
            } else {
                console.error('Token non trouvé dans la réponse');
                alert('Erreur de connexion');
            }
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            alert('Une erreur est survenue lors de la connexion, veuillez réessayer.');
        }
    };


    return (
        <div className="login-background">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6 col-page">
                    <div className="card">
                        <div className="card-header text-center">
                            <h4>Se connecter</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Mot de passe</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        value={password} // Utilisation de "password" au lieu de "motDePasse"
                                        onChange={(e) => setPassword(e.target.value)} // Mise à jour de la fonction de changement
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Se connecter</button>
                            </form>
                            <div className="mt-3 text-center">
                                <a href="/register" className="text-decoration-none">Pas encore inscrit ? S'inscrire</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Connexion;
