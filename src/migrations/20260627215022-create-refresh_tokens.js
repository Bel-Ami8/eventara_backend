'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('refresh_tokens', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type:  Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id'}
      },
      token_hash: {
        type: Sequelize.STRING(500),
        unique: true,
        allowNull: false
      },
      device_info: {
        type: Sequelize.STRING(100),
      },
      ip_address: {
        type: Sequelize.STRING(45),
      },
      expire_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
              //pour la révocation manuelle(déconnexion)
      is_revoked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      revoked_at: {
        type: Sequelize.DATE,
      },
      last_use_at: {
        type: Sequelize.DATE,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('now()')
      }
    });
    await queryInterface.addIndex('refresh_tokens', ['token_hash']);
    await queryInterface.addIndex('refresh_tokens', ['user_id']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('refresh_tokens');
  }
};
