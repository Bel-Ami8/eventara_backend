require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');//pour activer les sécurité contre plusieurs attaque classique coté client
const morgan = require('morgan');
const { swaggerUi, swaggerSpec } = require('./src/config/swagger.js');

//const routes= require('./src/routes');

//on crée une installe d'application qui représente le serveur auquel on attache tout
const app = express();

app.use(helmet());

app.use(cors(
    {
        origin: process.env.CLIENT_URL || '*',
        credential: true  //autorise l'envoi des cookies dans la requête
    }
));

app.use(morgan('dev'));//dev est un format prédéfinis de couleur pour morgan
app.use(express.json({limit: '10mb'}));//parse les requetes au format json et les rends dispo via req.body
// parse le corps de la requete au format de formulaire html,extended true permet de parser  les objets et tableaux imbriqués
app.use(express.urlencoded({extended: true}));


//swaggerUi.serve middelware qui sert les interfaces statique html, css et js, swaggerUi.setup :injecte  la spécification json dans la page html
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//app.use('/api/event', routes);

app.use((req,res)=>{
    //est déclanché si aucune route ne correspond
    res.status(404).json({success: false, message: 'route introuvable'})
});

module.exports = app;