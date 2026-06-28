'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('event_controllers', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
        allowNull:false
      },
      event_id: {
        type: Sequelize.UUID,
        allowNull:false,
        references: { model: 'events', key: 'id' }
      },
              //quel utilisateur est controleur
      user_id: {
        type: Sequelize.UUID,
        allowNull:false,
        references: { model: 'users', key: 'id'}
      },
              //quel organisateur l'a assigné
      assignedBy: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' }
      },
      //retirer l'accès sans supprimer l'historique
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('now()')
      }
    });
    await queryInterface.addIndex('event_controllers', ['user_id']);
    await queryInterface.addIndex('event_controllers', ['event_id']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('event_controllers');
  }
};
