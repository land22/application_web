import React from 'react';
import { FaUserCircle, FaSignOutAlt, FaHome, FaCog, FaChartLine, FaWarehouse, FaLeaf, FaSeedling } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div>
            {/* Barre horizontale en haut */}
            <div style={{
                height: '50px',
                background: 'linear-gradient(to right, #004600, #228B22, #808080)', // Dégradé vert à gris
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                padding: '0 20px',
                color: 'white'
            }}>
                {/* Icône utilisateur à droite */}
                <div className="dropdown">
                    <FaUserCircle size={30} style={{ cursor: 'pointer' }} data-bs-toggle="dropdown" />
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                            <a className="dropdown-item" href="/profile">Profil</a>
                        </li>
                        <li>
                            <button className="dropdown-item" onClick={handleLogout}>
                                <FaSignOutAlt style={{ marginRight: '5px' }} />
                                Déconnexion
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="dashboard-container" style={{ display: 'flex' }}>
                {/* Menu latéral */}
                <aside style={{
                    width: '250px',
                    backgroundColor: '#004600',
                    color: 'white',
                    padding: '20px',
                    minHeight: '100vh'
                }}>
                    <h3>Menu</h3>
                    <ul style={{ listStyleType: 'none', padding: '0' }}>
                        <li style={{ marginBottom: '15px' }}>
                            <a href="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>
                                <FaHome style={{ marginRight: '10px' }} />
                                Accueil
                            </a>
                        </li>
                        <li style={{ marginBottom: '15px' }}>
                            <a href="/stocklist" style={{ color: 'white', textDecoration: 'none' }}>
                                <FaWarehouse style={{ marginRight: '10px' }} />
                                gestion des stocks
                            </a>
                        </li>
                        <li style={{ marginBottom: '15px' }}>
                            <a href="/culturelist" style={{ color: 'white', textDecoration: 'none' }}>
                                <FaLeaf style={{ marginRight: '10px' }} />
                                gestion des cultures
                            </a>
                        </li>
                        <li style={{ marginBottom: '15px' }}>
                            <a href="/activiteagricolelist" style={{ color: 'white', textDecoration: 'none' }}>
                                <FaSeedling style={{ marginRight: '10px' }} />
                                Activités Agricole
                            </a>
                        </li>
                        <li style={{ marginBottom: '15px' }}>
                            <a href="/stats" style={{ color: 'white', textDecoration: 'none' }}>
                                <FaChartLine style={{ marginRight: '10px' }} />
                                Statistiques
                            </a>
                        </li>
                        <li>
                            <a href="/settings" style={{ color: 'white', textDecoration: 'none' }}>
                                <FaCog style={{ marginRight: '10px' }} />
                                Paramètres
                            </a>
                        </li>
                    </ul>
                </aside>

                {/* Contenu principal */}
                <div style={{ flex: 1, padding: '20px' }}>
                    {/* Contenu spécifique */}
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
