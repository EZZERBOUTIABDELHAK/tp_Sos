const express = require('express');
const Joi = require('joi');

const app = express();

app.use(express.json());

const Livres = [
    {
        id : 1,
        titre:"Info 1",
        auteur:"KF",
        description:"Aprops de Info1",
        prix: 2000
    },
    {
        id : 2,
        titre:"Info 2",
        auteur:"BM",
        description:"Aprops de Info2",
        prix: 3000
    }];
//les methode TP3
app.get('/', (req , res)=>{
    res.send("Holla")
})

app.get('/api/Livres', (req , res)=>{
    res.json(Livres)
})

app.get('/api/Livres/:id', (req , res)=>{
    const livreId = parseInt(req.params.id)
    const livreTrouve = Livres.find(livre => livre.id === livreId);

    if (livreTrouve) {
        res.status(200).json(livreTrouve);
    } else {
        res.status(404).send('Livre non trouv2');
    }
});

//les methose post Tp4
app.post('/api/livres', (req, res) => {
   
    const schema = Joi.object({
        titre: Joi.string().min(4).required(), 
        auteur: Joi.string().required(),
        description: Joi.string().min(4).required(),
        prix: Joi.number().required()
    });

    const { error } = schema.validate(req.body);

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

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'execution sur le port ${PORT}`);
});