'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('device_tokens', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull:false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      fcm_token: {
        type: Sequelize.TEXT,
        unique: true,
        allowNull: false
      },
      //android,ios,web pour adapter les notifications en fonction de ces platforms
      platform: {
        type: Sequelize.STRING(100),
        defaultValue: 'android',
        allowNull: false
      },
      device_name: {
        type: Sequelize.STRING(100),
      },
      device_model: {
        type: Sequelize.STRING(50),
      },
              //permet de savoir quels utilisateurs sont sur l'ancienne version avec  bug
              //pour les pousser à aller sur la nouvelle version
      app_version: {
        type: Sequelize.STRING(50),
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
              //dernière notification envoyée à
      last_used_at: {
        type: Sequelize.DATE,
        allowNull:  false
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('now()')
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('now()')
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('device_tokens');
  }
};
