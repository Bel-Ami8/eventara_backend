'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('categories', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
      primaryKey: true,
      allowNull: false
    },
    name: {
      type:  Sequelize.STRING(100),
      unique: true,
      allowNull: false
    },
    slug: {
      type: Sequelize.STRING(50),
      unique: true,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT
    },
    icon: {
      type: Sequelize.STRING(100)
    },
    color: {
      type: Sequelize.STRING(10)
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    position: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('now()')
    }
   });
   await queryInterface.addIndex('categories', ['slug']);
   await queryInterface.addIndex('categories', ['name']);
   await queryInterface.addIndex('categories', ['is_active'])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('categories');
  }
};
