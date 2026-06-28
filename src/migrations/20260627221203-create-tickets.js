'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query("CREATE TYPE enum_status_tickets as ENUM('en_attente', 'payé','utilisé', 'annulé');");
    await queryInterface.createTable('tickets', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true
      },
      order_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'orders',key: 'id' }
      },
      ticket_type_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'ticket_types', key: 'id' }
      },
              //nom de la personne qui utilise ce billet
      attendee_name: {
        type: Sequelize.STRING(50),
      },
      attendee_phone: {
        type: Sequelize.STRING(20),
      },
              //payload généré, signé HMAC-SHA256 unique pour éviter que les qrcode  soient identiques
      qr_code_data: {
        type: Sequelize.TEXT,
        unique: true,
        allowNull: false
      },
              //url de l'image qr code généré après confirmation de paiement
      qr_code_url: {
        type: Sequelize.STRING(500),
      },
      status: {
        type: 'enum_status_tickets',
        defaultValue: 'en_attente',
        allowNull: false
      },
      used_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      scanned_by: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'event_controllers', key: 'id' }
      },
      created_at: {
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
    await queryInterface.addIndex('tickets', ['order_id']);
    await queryInterface.addIndex('tickets', ['ticket_type_id']);
    await queryInterface.addIndex('tickets', ['status']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tickets');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_status_tickets');
  }
};
