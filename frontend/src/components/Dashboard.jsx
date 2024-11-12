import React from 'react';

const Dashboard = () => {
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
                            <a href="/logout" className="btn btn-danger">Se déconnecter</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
