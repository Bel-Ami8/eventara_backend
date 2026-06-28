'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('audit_log', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.literal('gen_random_uuid()')
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' }
      },
      action: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      //entité concernée par l'action
      entity_type: {
        type: Sequelize.STRING(50),
      },
      entity_id: {
        type: Sequelize.UUID,
      },
      old_value: {
        type: Sequelize.JSONB,
      },
      new_value: {
        type: Sequelize.JSONB,
      },
      ip_address: {
        type: Sequelize.STRING(45),
      },
              //contexte de l'action etc
      metadata: {
        type: Sequelize.JSONB
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
    await queryInterface.addIndex('audit_log', ['user_id']);
    await queryInterface.addIndex('audit_log', ['action']);
    await queryInterface.addIndex('audit_log', ['entity_type', 'entity_id']);
    await queryInterface.addIndex('audit_log', ['created_at']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('audit_log');
  }
};
