'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query("CREATE TYPE enum_status_payments as ENUM('en_attente','en_cours', 'complétée','échouée', 'annulée');");
    await queryInterface.createTable('payments', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true
      },
      order_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'orders', key: 'id'}
      },
      amount: {
        type: Sequelize.DECIMAL(12,0),
        allowNull: false
      },
              //type de dévise,stockée explicitement pour  l'internationalisation future
      currentcy: {
        type: Sequelize.STRING(3),
        allowNull: false,
        defaultValue: 'XAF'
      },
              //agrégateur
      provider: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
              //reference unique du provider
      provider_transaction_id: {
        type: Sequelize.STRING(200),
        unique: true,
      },
              //numéro de téléphone utilisé pour la transaction
      phone_number: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      status: {
        type: 'enum_status_payments',
        defaultValue: 'en_attente',
        allowNull: false
      },
      faillure_reason: {
        type: Sequelize.TEXT,
      },
              //début de la tentative
      initiliaze_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      confirmed_at: {
        type: Sequelize.DATE,
      },
              //donné brute  du webhook utile en cas  de litige  avec le provider
      metadata: {
        type: Sequelize.JSONB 
      }
    });
    await queryInterface.addIndex('payments', ['order_id']);
    await queryInterface.addIndex('payments', ['status']);
    await queryInterface.addIndex('payments', ['provider']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('payments');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_status_payments');
  }
};
