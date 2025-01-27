const express = require('express');
const cors = require('cors');
const mtpRoutes = require('./routes/mtpRoutes');

const app = express();
const PORT = 5000;

app.use(cors({
    origin: 'https://nearby-mtp.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/', mtpRoutes);

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});