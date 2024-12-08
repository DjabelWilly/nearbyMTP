const axios = require('axios');
require('dotenv').config();

const BASE_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
const API_KEY = process.env.API_KEY;

// Fonction pour récupérer les lieux à partir de l'API Google Places
const fetchPlaces = async (req, res) => {

    // Récupère la recherche envoyée par le client avec paramètres lieux et rayon 
    try {
        const { activity, radius } = req.query;
        if (!activity || !radius) {

            return res.status(400).json({ message: 'Veuillez spécifier une activité et un rayon.' });
        }
        // Coordonnées de Montpellier (point de départ de la recherche)
        const latitude = 43.6108;
        const longitude = 3.8767;

        const url = `${BASE_URL}?location=${latitude},${longitude}&radius=${radius}&keyword=${encodeURIComponent(activity)}&key=${API_KEY}`;

        // Appel à l'API Google
        const response = await axios.get(url);

        const places = response.data.results;


        // Envoi des résultats sous forme de réponse JSON
        res.json({ places });
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error.message);
        res.status(500).json({ message: 'Erreur lors de la récupération des lieux.' });
    }
}



module.exports = { fetchPlaces };
