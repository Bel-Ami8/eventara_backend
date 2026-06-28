require('dotenv').config();

//on importe l'application express déjà configurée
const app = require('./app');
const PORT  = process.env.PORT || 3000;
//on importe sequelize pour tester la connexion au démarrage
const sequelize = require('./src/config/database');

async function lancerServeur(){
    try{
        //envoie une requete simple à postgres pour voir si la  connexion fonctionne
        //ou lève  une erreur si la connexion est impossible
        await sequelize.authenticate();
        console.log('base de  donnée connectée avec succès');

        app.listen(PORT, ()=>{
            console.log(`le serveur a démarré sur: http://localhost:${PORT}`);
            console.log(`la documentation est disponible sur: http://localhost:${PORT}/api-docs`);
        })
    } catch(error){
        console.error('erreur de démarrage du serveur', error.message);
        process.exit(1); //arrete le serveur avec une erreur 1 echec, 0 succès
    }
}

lancerServeur();