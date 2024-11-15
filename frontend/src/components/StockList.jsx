import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Table } from 'react-bootstrap';
import Layout from './Layout'; // Import du Layout

const StockList = () => {
    const [stocks, setStocks] = useState([]);
    const [newStock, setNewStock] = useState({ article_name: '', quantity: '', description: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editStock, setEditStock] = useState(null);
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        axios.get('http://localhost:8000/api/stocks', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(response => setStocks(response.data))
            .catch(error => console.error(error));
    }, []);

    // Gérer l'affichage de la modale
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setIsEditing(false);
        setNewStock({ article_name: '', quantity: '', description: '' });
    };

    // Ajouter un stock
    const handleAddStock = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/stocks', newStock, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(response => {
                setStocks([...stocks, response.data]);
                handleCloseModal();
            })
            .catch(error => console.error(error));
    };

    // Modifier un stock
    const handleEditStock = (stock) => {
        setIsEditing(true);
        setEditStock(stock);
        setNewStock({ article_name: stock.article_name, quantity: stock.quantity, description: stock.description });
        handleShowModal();
    };

    // Sauvegarder la modification
    const handleUpdateStock = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/stocks/${editStock.id}`, newStock, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(response => {
                setStocks(stocks.map(stock => stock.id === editStock.id ? response.data : stock));
                handleCloseModal();
            })
            .catch(error => console.error(error));
    };

    // Supprimer un stock
    const handleDeleteStock = (id) => {
        axios.delete(`http://localhost:8000/api/stocks/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(() => {
                setStocks(stocks.filter(stock => stock.id !== id));
            })
            .catch(error => console.error(error));
    };

    return (
        <Layout> {/* Utilisation du Layout */}
            <div className="container mt-4">
                <h3>Gestion des Stocks</h3>
                <Button variant="primary" onClick={handleShowModal}>
                    Ajouter un article
                </Button>

                {stocks.length > 0 ? (
                    <Table striped bordered hover className="mt-3">
                        <thead>
                            <tr>
                                <th>Nom de l'article</th>
                                <th>Quantité</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stocks.map(stock => (
                                <tr key={stock.id}>
                                    <td>{stock.article_name}</td>
                                    <td>{stock.quantity}</td>
                                    <td>{stock.description}</td>
                                    <td>
                                        <Button variant="warning" onClick={() => handleEditStock(stock)} className="me-2">
                                            Modifier
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDeleteStock(stock.id)}>
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

                {/* Modal pour ajouter/modifier un stock */}
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{isEditing ? 'Modifier l\'article' : 'Ajouter un article'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={isEditing ? handleUpdateStock : handleAddStock}>
                            <div className="form-group mb-3">
                                <label>Nom de l'article</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={newStock.article_name}
                                    onChange={(e) => setNewStock({ ...newStock, article_name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Quantité</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={newStock.quantity}
                                    onChange={(e) => setNewStock({ ...newStock, quantity: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Description</label>
                                <textarea
                                    className="form-control"
                                    value={newStock.description}
                                    onChange={(e) => setNewStock({ ...newStock, description: e.target.value })}
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

export default StockList;
