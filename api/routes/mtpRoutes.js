const express = require('express');
const router = express.Router();
const { fetchPlaces, getApiKey, getPlaceDetails } = require('../controller/mtpController');

// Route pour récupérer les lieux en fonction de l'activité et du rayon
router.get('/api/search', fetchPlaces);

router.get('/api/key', getApiKey);

router.get('/api/details', getPlaceDetails);




module.exports = router;
