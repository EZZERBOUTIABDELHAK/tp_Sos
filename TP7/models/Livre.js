const mongoose = require('mongoose');

const livreSchema = new mongoose.Schema({
    titre: { type: String },
    auteur: { type: String },
    description: { type: String },
    prix: { type: Number }
}, { 
    timestamps: true 
});

const Livre = mongoose.model('Livre', livreSchema);

module.exports = Livre;
