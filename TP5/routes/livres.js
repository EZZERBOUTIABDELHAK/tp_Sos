const express = require('express');
const router = express.Router();
const Joi = require('joi');

const Livres = [
    { id: 1, titre: "Info 1", auteur: "KF", description: "A propos de Info 1", prix: 2000 },
    { id: 2, titre: "Info 2", auteur: "BM", description: "A propos de Info 2", prix: 3000 }
];

function validationCreateLivre(livre) {
    const schema = Joi.object({
        titre: Joi.string().min(4).required(),
        auteur: Joi.string().required(),
        description: Joi.string().min(4).required(),
        prix: Joi.number().required()
    });
    return schema.validate(livre);
}

/**
 * @description Obtenir la liste des livres
 * @route /api/livres
 * @method GET
 * @access public
 */
router.get("/", (req, res) => {
    res.json(Livres);
});

/**
 * @description Obtenir un livre par son identifiant
 * @route /api/livres/:id
 * @method GET
 * @access public
 */
router.get("/:id", (req, res) => {
    const livreId = parseInt(req.params.id);
    const livreTrouve = Livres.find(livre => livre.id === livreId);

    if (livreTrouve) {
        res.status(200).json(livreTrouve);
    } else {
        res.status(404).send('Livre non trouve');
    }
});

/**
 * @description Creer un livre
 * @route /api/livres
 * @method POST
 * @access public
 */
router.post("/", (req, res) => {
    const { error } = validationCreateLivre(req.body);

    if (error) {
        if (error.details[0].path[0] === 'titre') {
            return res.status(400).send("Le titre est obligatoire et doit avoir plus de 3 caracteres.");
        }
        return res.status(400).send(error.details[0].message);
    }

    const nouveauLivre = {
        id: Livres.length + 1,
        titre: req.body.titre,
        auteur: req.body.auteur,
        description: req.body.description,
        prix: req.body.prix
    };

    Livres.push(nouveauLivre);
    res.status(201).json(nouveauLivre);
});

module.exports = router;