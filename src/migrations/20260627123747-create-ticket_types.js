'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ticket_types', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey:true,
        allowNull: false
      },
      event_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'events', key: 'id' }
      },
             //ex basic, vip etc
      name: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      price: {
        type: Sequelize.DECIMAL(12,0),
        defaultValue: 0,
        allowNull: false
             },
             //nombre de places
        quota: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
             //places restantes
        availlable: {
          type: Sequelize.INTEGER, 
          allowNull: false
        },
        cretad_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('now()')
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('now()')
        }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('ticket_types');
  }
};
