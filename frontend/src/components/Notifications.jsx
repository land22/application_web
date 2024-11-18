import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Table } from 'react-bootstrap';
import Layout from './Layout'; // Import du Layout
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [newNotification, setNewNotification] = useState({ message: '', type: '', date: new Date() });
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editNotification, setEditNotification] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/notifications', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(response => setNotifications(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setIsEditing(false);
        setNewNotification({ message: '', type: '', date: new Date() });
    };

    const handleAddNotification = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/notifications', newNotification, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(response => {
                setNotifications([...notifications, response.data.notification]);
                handleCloseModal();
            })
            .catch(error => console.error(error));
    };

    const handleEditNotification = (notification) => {
        setIsEditing(true);
        setEditNotification(notification);

        // Vérifier si la date est valide
        const validDate = notification.date ? new Date(notification.date) : new Date();

        setNewNotification({
            message: notification.message,
            type: notification.type,
            date: isNaN(validDate.getTime()) ? new Date() : validDate // Utiliser la date actuelle si la date est invalide
        });
        handleShowModal();
    };

    const handleUpdateNotification = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/notifications/${editNotification.id}`, newNotification, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(response => {
                setNotifications(notifications.map(notification =>
                    notification.id === editNotification.id ? response.data.notification : notification
                ));
                handleCloseModal();
            })
            .catch(error => console.error(error));
    };

    const handleDeleteNotification = (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette notification ?')) {
            axios.delete(`http://localhost:8000/api/notifications/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            })
                .then(response => {
                    setNotifications(notifications.filter(notification => notification.id !== id));
                })
                .catch(error => console.error(error));
        }
    };

    return (
        <Layout>
            <div className="container mt-4">
                <h3>Gestion des Notifications</h3>
                <Button onClick={handleShowModal}>Ajouter une notification</Button>

                <Table striped bordered hover className="mt-3">
                    <thead>
                        <tr>
                            <th>Message</th>
                            <th>Type</th>
                            <th>Auteur</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notifications.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Pas de notifications pour le moment.
                                </td>
                            </tr>
                        ) : (
                            notifications.map(notification => (
                                <tr key={notification.id}>
                                    <td>{notification.message}</td>
                                    <td>{notification.type}</td>
                                    <td>{notification.user ? notification.user.name : 'Auteur inconnu'}</td>
                                    <td>{new Date(notification.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <Button variant="warning" onClick={() => handleEditNotification(notification)}>Modifier</Button>
                                        <Button variant="danger" onClick={() => handleDeleteNotification(notification.id)} className="ml-2">Supprimer</Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>

                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{isEditing ? 'Modifier Notification' : 'Ajouter Notification'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={isEditing ? handleUpdateNotification : handleAddNotification}>
                            <div className="form-group mb-3">
                                <label>Message</label>
                                <textarea
                                    className="form-control"
                                    value={newNotification.message}
                                    onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Type</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={newNotification.type}
                                    onChange={(e) => setNewNotification({ ...newNotification, type: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Date</label>
                                <DatePicker
                                    selected={newNotification.date}
                                    onChange={(date) => setNewNotification({ ...newNotification, date })}
                                    className="form-control"
                                    dateFormat="dd/MM/yyyy"
                                    required
                                />
                            </div>
                            <Button type="submit">{isEditing ? 'Mettre à jour' : 'Ajouter'}</Button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        </Layout>
    );
};

export default Notifications;
