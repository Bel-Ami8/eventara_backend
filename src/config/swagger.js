const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
   definition: {
    openapi: '3.0.0',
    info: {
        title: 'Eventara API',
        version: '1.0.0',
        description: 'Documentation complete Eventara plateforme de billeterie',
    },
    servers: [
        {url: 'http://localhost:3000/api/event', description: 'developpement local'}
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            }
        }
    }
   },
   apis: ['./src/routes/*.js'], //indique où swaggerjsdoc ira lire les annotations
};

const swaggerSpec = swaggerJsdoc(options); // retourne un objet JSON, c'est cet objet que swagger-ui-express va lire et afficher en version web

module.exports = { swaggerUi, swaggerSpec };