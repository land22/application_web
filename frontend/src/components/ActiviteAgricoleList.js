import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Table } from 'react-bootstrap';
import Layout from './Layout'; // Import du Layout

const ActiviteAgricoleList = () => {
    const [activites, setActivites] = useState([]);
    const [cultures, setCultures] = useState([]);
    const [newActivite, setNewActivite] = useState({ type: '', description: '', date: '', id_culture: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editActivite, setEditActivite] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/activites-agricoles', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(response => setActivites(response.data))
            .catch(error => console.error(error));

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
        setNewActivite({ type: '', description: '', date: '', id_culture: '' });
    };

    const handleAddActivite = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/activites-agricoles', newActivite, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(response => {
                setActivites([...activites, response.data]);
                handleCloseModal();
            })
            .catch(error => console.error(error));
    };

    const handleEditActivite = (activite) => {
        setIsEditing(true);
        setEditActivite(activite);
        setNewActivite({
            type: activite.type,
            description: activite.description,
            date: activite.date,
            id_culture: activite.id_culture
        });
        handleShowModal();
    };

    const handleUpdateActivite = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/activites-agricoles/${editActivite.id}`, newActivite, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(response => {
                setActivites(activites.map(act => act.id === editActivite.id ? response.data : act));
                handleCloseModal();
            })
            .catch(error => console.error(error));
    };

    const handleDeleteActivite = (id) => {
        axios.delete(`http://localhost:8000/api/activites-agricoles/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(() => {
                setActivites(activites.filter(act => act.id !== id));
            })
            .catch(error => console.error(error));
    };

    return (
        <Layout>
            <div className="container mt-4">
                <h3>Gestion des Activités Agricoles</h3>
                <Button
                    style={{ backgroundColor: '#004600', color: 'white', border: 'none', borderRadius: '10px' }}
                    onClick={handleShowModal}
                >
                    Ajouter une activité agricole
                </Button>

                {activites.length > 0 ? (
                    <Table striped bordered hover className="mt-3">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Culture</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activites.map(activite => (
                                <tr key={activite.id}>
                                    <td>{activite.type}</td>
                                    <td>{activite.description}</td>
                                    <td>{activite.date}</td>
                                    <td>{activite.culture ? activite.culture.nom : 'N/A'}</td>
                                    <td>
                                        <Button variant="warning" onClick={() => handleEditActivite(activite)} className="me-2">
                                            Modifier
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDeleteActivite(activite.id)}>
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

                {/* Modal pour ajouter/modifier une activité */}
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{isEditing ? 'Modifier l\'activité agricole' : 'Ajouter une activité agricole'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={isEditing ? handleUpdateActivite : handleAddActivite}>
                            <div className="form-group mb-3">
                                <label>Type</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={newActivite.type}
                                    onChange={(e) => setNewActivite({ ...newActivite, type: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Description</label>
                                <textarea
                                    className="form-control"
                                    value={newActivite.description}
                                    onChange={(e) => setNewActivite({ ...newActivite, description: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={newActivite.date}
                                    onChange={(e) => setNewActivite({ ...newActivite, date: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Culture</label>
                                <select
                                    className="form-control"
                                    value={newActivite.id_culture}
                                    onChange={(e) => setNewActivite({ ...newActivite, id_culture: e.target.value })}
                                    required
                                >
                                    <option value="">Sélectionner une culture</option>
                                    {cultures.map(culture => (
                                        <option key={culture.id} value={culture.id}>
                                            {culture.nom}
                                        </option>
                                    ))}
                                </select>
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

export default ActiviteAgricoleList;
