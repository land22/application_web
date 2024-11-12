import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate

const Connexion = () => {
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const navigate = useNavigate(); // Utilisez useNavigate pour la redirection

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login', {
                email,
                mot_de_passe: motDePasse,
            });
            // Une fois la connexion réussie, redirigez l'utilisateur
            localStorage.setItem('token', response.data.token); // Assurez-vous de stocker le token
            navigate('/dashboard'); // Redirige vers le tableau de bord
        } catch (error) {
            console.error('Erreur lors de la connexion', error);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
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
                                    <label htmlFor="motDePasse" className="form-label">Mot de passe</label>
                                    <input
                                        type="password"
                                        id="motDePasse"
                                        className="form-control"
                                        value={motDePasse}
                                        onChange={(e) => setMotDePasse(e.target.value)}
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
