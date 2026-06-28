'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query("CREATE TYPE enum_role as ENUM('participant', 'admin', 'organisateur', 'controleur');");
    await queryInterface.createTable('users',{
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
        allowNull: false
      },
      first_name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      email: {
        type:  Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      phone: {
        type: Sequelize.STRING(20),
          unique: true
      },
      password_hash: {
        type: Sequelize.STRING(255),//nullable car les comptes googles n'ont pas besoin de mot de passe
        unique: true,
      },
      google_id: {
        type: Sequelize.STRING(200),//id google OAuth stocké pour facilité laconnexion sans demander d'email à nouveau
        unique: true,
      },  
      facebook_id: {
        type: Sequelize.STRING(200),
        unique: true,
      },
      avatar_url: {
        type: Sequelize.STRING(500),//url de l'avatar google qui est lié à google OAuth
      },
      role: {
        type: 'enum_role',
        defaultValue: 'participant',
        allowNull: false
      },
              //permet de simplement activer ou désactiver un compte par défaut les comptes sont activés
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
              //pour vérifier les identité des personnes qui vont publier sur la plaeforme
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
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
    await queryInterface.addIndex('users', ['email']);
    await queryInterface.addIndex('users', ['role']);
    await queryInterface.addIndex('users', ['google_id']);
    await queryInterface.addIndex('users', ['facebook_id'])
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('users');
     await queryInterface.sequelize.query("DROP TYPE IF EXISTS enum_role;")
  }
};
