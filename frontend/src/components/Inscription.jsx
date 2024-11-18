import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Inscription = () => {
    // État pour les champs du formulaire
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    // État pour gérer les erreurs de validation
    const [errors, setErrors] = useState({});

    const navigate = useNavigate(); // Utilisation de `useNavigate` pour la redirection

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'password_confirmation':
                setPasswordConfirmation(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Envoi des données vers l'API backend Laravel
            const response = await axios.post('http://localhost:8000/api/register', {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });

            // Sauvegarde du jeton d'accès et de l'utilisateur dans le localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', response.data.user.name);

            // Redirige vers la page des étudiants après l'inscription
            navigate('/dashboard', { replace: true });
        } catch (error) {
            console.error('Erreur lors de l\'inscription', error);

            // Vérification plus détaillée de l'erreur
            if (error.response) {
                console.error('Response data:', error.response.data);
                const errors = error.response.data.errors;
                if (errors) {
                    // Mettez à jour l'état `errors` avec les erreurs retournées par l'API
                    setErrors(errors);
                } else {
                    alert(`Erreur lors de l'inscription : ${error.response.data.message}`);
                }
            } else if (error.request) {
                console.error('Request data:', error.request);
                alert('Erreur lors de l\'inscription : Problème avec la requête.');
            } else {
                console.error('General error:', error.message);
                alert(`Erreur lors de l'inscription : ${error.message}`);
            }
        }
    };

    return (
        <div className="register-background">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6 col-page">
                    <div className="card">
                        <div className="card-header text-center">
                            <h4>S'inscrire</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Nom</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                        value={name}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.name && <div className="invalid-feedback">{errors.name.join(', ')}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        value={email}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email.join(', ')}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Mot de passe</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        value={password}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.password && <div className="invalid-feedback">{errors.password.join(', ')}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="passwordConfirmation" className="form-label">Confirmer le mot de passe</label>
                                    <input
                                        type="password"
                                        id="passwordConfirmation"
                                        name="password_confirmation"
                                        className={`form-control ${errors.password_confirmation ? 'is-invalid' : ''}`}
                                        value={passwordConfirmation}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.password_confirmation && <div className="invalid-feedback">{errors.password_confirmation.join(', ')}</div>}
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
