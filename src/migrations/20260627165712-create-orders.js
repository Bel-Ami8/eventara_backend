'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query("CREATE TYPE enum_status_orders as ENUM('en_attente', 'payé', 'annulé', 'expiré');");
    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id'}
      },
      ticket_type_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'ticket_types', key: 'id'}
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      unit_price: {
        type: Sequelize.DECIMAL(12,0),
        allowNull: false
      },
      total_price: {
        type: Sequelize.DECIMAL(12,0),
        allowNull: false
      },
      status: {
        type: 'enum_status_orders',
        defaultValue: 'en_attente',
        allowNull: false
      },
      payment_provider: {
        type: Sequelize.STRING(50),
      },
      payment_reference: {
        type: Sequelize.STRING(200),
        unique: true
      },
          //code du promoteur  si la commande  vient d'un lien de démarcheur
      referal_code: {
        type: Sequelize.STRING(20),
      },
      expired_at: {
        type: Sequelize.DATE,
        allowNull: false
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
    await queryInterface.addIndex('orders', ['user_id']);
    await queryInterface.addIndex('orders', ['status']);
    await queryInterface.addIndex('orders', ['expired_at']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_status_orders');
  }
};
