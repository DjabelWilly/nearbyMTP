const express = require('express');
const cors = require('cors');
const mtpRoutes = require('./routes/mtpRoutes');

const PORT = process.env.PORT;

const app = express();

// Configuration CORS
const allowedOrigins = [
    'http://localhost:3000',            // url frontend local
    'https://nearby-mtp.vercel.app'     // url front de Production
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