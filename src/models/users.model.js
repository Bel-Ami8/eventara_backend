const { Datatypes } = require('sequelize');

module.exports= (sequelize)  =>{
    const User = sequelize.define('User',{
        id: {
            type: Datatypes.UUID,
            defaultValue: Datatypes.UUIDV4,
            primaryKey: true
        },
        firstName: {
            type: Datatypes.STRING(50),
            field: 'first_name',//son equivalent en nom dans la BD(postgresql)
            allowNull: false
        },
        lastName: {
            type: Datatypes.STRING(50),
            field: 'last_name',
            allowNull: false
        },
        email: {
            type:  Datatypes.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        phone: {
            type: Datatypes.STRING(20),
            unique: true
        },
        passwordHash: {
            type: Datatypes.STRING(255),//nullable car les comptes googles n'ont pas besoin de mot de passe
            unique: true,
            field: 'password_hash'
        },
        googleId: {
            type: Datatypes.STRING(200),//id google OAuth stocké pour facilité laconnexion sans demander d'email à nouveau
            unique: true,
            field:'google_id'
        },
        facebookId: {
            type: Datatypes.STRING(200),
            unique: true,
            field: 'facebook_id'
        },
        avatarUrl: {
            type: Datatypes.STRING(500),//url de l'avatar google qui est lié à google OAuth
            field: 'avatar_url'
        },
        role: {
            type: Datatypes.ENUM('participant', 'admin', 'organisateur', 'controleur'),
            defaultValue: 'participant',
            allowNull: false
        },
        //permet de simplement activer ou désactiver un compte par défaut les comptes sont activés
        isActive: {
            type: Datatypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
            field: 'is_active'
        },
        //pour vérifier les identité des personnes qui vont publier sur la plaeforme
        isVerified: {
            type: Datatypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            field: 'is_verified'
        }
    },{
        tableName: 'users',
        timestamps: true,
        underscored: true,//sequelize converti createdAt en created_at en BD[]

        //index
        indexes: [
            {fields: ['email']},
            {fields: ['role']},
            {fields: ['google_id']},
            {fields: ['facebook_id']}
        ]
    }),
    return User;
};