'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query("CREATE TYPE enum_status_event as ENUM('brouillon','publié','terminé', 'complet','annulé');");
    await queryInterface.createTable('events', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true
      },
      organizer_id : {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' }
      },
      category_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'categories', key: 'id' }
      },
      description: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      title: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      cover_image_url: {
        type: Sequelize.STRING(200),
      },
              //localisation de l'évènement
      location_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      location_lat: {
        type: Sequelize.DECIMAL(9,6),
      },
      location_long: {
        type: Sequelize.DECIMAL(9,6),
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      end_date:{
        type: Sequelize.DATE,
      },
      status: {
        type: 'enum_status_event',
        defaultValue: 'brouillon',
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('now()'),
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('now()'),
        allowNull: false
      }
    });
    await queryInterface.addIndex('events', ['organizer_id']);
    await queryInterface.addIndex('events', ['category_id']);
    await queryInterface.addIndex('events', ['status']);
    await queryInterface.addIndex('events', ['start_date']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('events');
    await queryInterface.sequelize.query("DROP TYPE IF EXISTS enum_status_event;")
  }
};
