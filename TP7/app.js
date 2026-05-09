const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bookStoreDB')
    .then(() => console.log('Connecté à MongoDB...'))
    .catch((err) => console.log('Connexion à MongoDB échouée...', err));

const app = express();

app.use(express.json());

const livresPath = require("./routes/livres");

app.use("/api/livres", livresPath);

app.get('/', (req, res) => {
    res.send('Holla');
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Serveur en cours sur le port ${PORT}`);
});