const express = require('express');
const router = express.Router();
const { fetchPlaces, getApiKey } = require('../controller/mtpController');

// Route pour récupérer les lieux en fonction de l'activité et du rayon
router.get('/api/search', fetchPlaces);

router.get('/api/key', getApiKey);


module.exports = router;
