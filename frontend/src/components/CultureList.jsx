import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Table } from 'react-bootstrap';
import Layout from './Layout'; // Import du Layout

const CultureList = () => {
    const [cultures, setCultures] = useState([]);
    const [newCulture, setNewCulture] = useState({ nom: '', type: '', date_plantation: '', date_recolte: '', statut: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editCulture, setEditCulture] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/cultures', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(response => setCultures(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setIsEditing(false);
        setNewCulture({ nom: '', type: '', date_plantation: '', date_recolte: '', statut: '' });
    };

    const handleAddCulture = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/cultures', newCulture, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(response => {
                setCultures([...cultures, response.data]);
                handleCloseModal();
            })
            .catch(error => console.error(error));
    };

    const handleEditCulture = (culture) => {
        setIsEditing(true);
        setEditCulture(culture);
        setNewCulture({
            nom: culture.nom,
            type: culture.type,
            date_plantation: culture.date_plantation,
            date_recolte: culture.date_recolte,
            statut: culture.statut
        });
        handleShowModal();
    };

    const handleUpdateCulture = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/cultures/${editCulture.id}`, newCulture, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(response => {
                setCultures(cultures.map(culture => culture.id === editCulture.id ? response.data : culture));
                handleCloseModal();
            })
            .catch(error => console.error(error));
    };

    const handleDeleteCulture = (id) => {
        axios.delete(`http://localhost:8000/api/cultures/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(() => {
                setCultures(cultures.filter(culture => culture.id !== id));
            })
            .catch(error => console.error(error));
    };

    return (
        <Layout>
            <div className="container mt-4">
                <h3>Gestion des Cultures</h3>
                <Button style={{ backgroundColor: '#004600', color: 'white', border: 'none', borderRadius: '10px' }}
                    onClick={handleShowModal}>
                    Ajouter une culture
                </Button>

                {cultures.length > 0 ? (
                    <Table striped bordered hover className="mt-3">
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Type</th>
                                <th>Date de plantation</th>
                                <th>Date de récolte</th>
                                <th>Statut</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cultures.map(culture => (
                                <tr key={culture.id}>
                                    <td>{culture.nom}</td>
                                    <td>{culture.type}</td>
                                    <td>{culture.date_plantation}</td>
                                    <td>{culture.date_recolte}</td>
                                    <td>{culture.statut}</td>
                                    <td>
                                        <Button variant="warning" onClick={() => handleEditCulture(culture)} className="me-2">
                                            Modifier
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDeleteCulture(culture.id)}>
                                            Supprimer
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <p className="mt-3">Données indisponibles</p>
                )}

                {/* Modal pour ajouter/modifier une culture */}
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{isEditing ? 'Modifier la culture' : 'Ajouter une culture'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={isEditing ? handleUpdateCulture : handleAddCulture}>
                            <div className="form-group mb-3">
                                <label>Nom</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={newCulture.nom}
                                    onChange={(e) => setNewCulture({ ...newCulture, nom: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Type</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={newCulture.type}
                                    onChange={(e) => setNewCulture({ ...newCulture, type: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Date de plantation</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={newCulture.date_plantation}
                                    onChange={(e) => setNewCulture({ ...newCulture, date_plantation: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Date de récolte</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={newCulture.date_recolte}
                                    onChange={(e) => setNewCulture({ ...newCulture, date_recolte: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Statut</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={newCulture.statut}
                                    onChange={(e) => setNewCulture({ ...newCulture, statut: e.target.value })}
                                    required
                                />
                            </div>
                            <Button type="submit" variant="success">
                                {isEditing ? 'Mettre à jour' : 'Ajouter'}
                            </Button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        </Layout>
    );
};

export default CultureList;
