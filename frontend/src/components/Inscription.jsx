import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate

const Inscription = () => {
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [motDePasseConfirmation, setMotDePasseConfirmation] = useState('');
    const navigate = useNavigate(); // Utilisez useNavigate pour la redirection

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/register', {
                nom,
                email,
                mot_de_passe: motDePasse,
                mot_de_passe_confirmation: motDePasseConfirmation,
            });
            // Redirige vers la page de connexion après une inscription réussie
            navigate('/login');
        } catch (error) {
            console.error('Erreur lors de l\'inscription', error);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header text-center">
                            <h4>S'inscrire</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="nom" className="form-label">Nom</label>
                                    <input
                                        type="text"
                                        id="nom"
                                        className="form-control"
                                        value={nom}
                                        onChange={(e) => setNom(e.target.value)}
                                        required
                                    />
                                </div>
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
                                <div className="mb-3">
                                    <label htmlFor="motDePasseConfirmation" className="form-label">Confirmer le mot de passe</label>
                                    <input
                                        type="password"
                                        id="motDePasseConfirmation"
                                        className="form-control"
                                        value={motDePasseConfirmation}
                                        onChange={(e) => setMotDePasseConfirmation(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">S'inscrire</button>
                            </form>
                            <div className="mt-3 text-center">
                                <a href="/login" className="text-decoration-none">Vous avez déjà un compte ? Se connecter</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inscription;
