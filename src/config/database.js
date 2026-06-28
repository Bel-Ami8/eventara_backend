require('dotenv').config();

const { Sequelize } = require('sequelize');
const config = require('./config.js');
//recupère l'environnement actuel
const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(
   config[env].database,
   config[env].username,
   config[env]. password,
  {
    ...config[env],
    pool:{
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
  }
);

module.exports = sequelize;