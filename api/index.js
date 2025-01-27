const express = require('express');
const cors = require('cors');
const mtpRoutes = require('./routes/mtpRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Configuration CORS
const allowedOrigins = [
    'http://localhost:3000',            // Développement local
    'https://nearby-mtp.vercel.app'     // Production
];

app.use(cors({
    origin: allowedOrigins
}));
app.use(express.json());

// Routes
app.use('/', mtpRoutes);

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});