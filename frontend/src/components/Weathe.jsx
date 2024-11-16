import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button, Form } from 'react-bootstrap';
import { FaSun, FaCloud, FaCloudRain, FaBolt, FaSnowflake, FaWind, FaCloudShowersHeavy, FaSmog } from 'react-icons/fa';
import Layout from './Layout'; // Import du Layout

const WeatherDashboard = () => {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWeather = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const apiKey = '0441badc468664f5d4e90dbc13b19911'; // Remplacez par votre clé API
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

        axios.get(url)
            .then(response => {
                setWeatherData(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Impossible de récupérer les données météo. Vérifiez le lieu.');
                setLoading(false);
            });
    };

    const getIcon = (description) => {
        switch (description) {
            case 'clear sky':
                return <FaSun />;
            case 'few clouds':
                return <FaCloud />;
            case 'scattered clouds':
                return <FaCloud />;
            case 'shower rain':
                return <FaCloudRain />;
            case 'rain':
                return <FaCloudRain />;
            case 'thunderstorm':
                return <FaBolt />;
            case 'snow':
                return <FaSnowflake />;
            case 'mist':
                return <FaSmog />;
            default:
                return <FaCloud />;
        }
    };

    return (
        <Layout>
            <div className="container mt-4">
                <Form onSubmit={fetchWeather}>
                    <Form.Group className="mb-3">
                        <Form.Label>Entrez un lieu :</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ville"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? 'Chargement...' : 'Obtenir la météo'}
                    </Button>
                </Form>

                {error && <div className="mt-3 text-danger">{error}</div>}

                {weatherData && (
                    <div className="mt-4">
                        <Card>
                            <Card.Header>Météo pour {weatherData.city.name}</Card.Header>
                            <Card.Body>
                                {weatherData.list.slice(0, 5).map((forecast, index) => (
                                    <Card key={index} className="mt-3">
                                        <Card.Body>
                                            <div className="d-flex align-items-center">
                                                {getIcon(forecast.weather[0].description)}
                                                <div className="ms-3">
                                                    <h5>{new Date(forecast.dt * 1000).toLocaleDateString()}</h5>
                                                    <p><strong>Température :</strong> {forecast.main.temp}°C</p>
                                                    <p><strong>Description :</strong> {forecast.weather[0].description}</p>
                                                    <p><strong>Humidité :</strong> {forecast.main.humidity}%</p>
                                                    <p><strong>Vitesse du vent :</strong> {forecast.wind.speed} m/s</p>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </Card.Body>
                        </Card>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default WeatherDashboard;
