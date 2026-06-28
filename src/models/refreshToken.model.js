const { Datatypes } = require('sequelize');

//le refresh token quidure 30 jours,permet de renouveller le access token silencieusement
//sans que l'utilisateur ne s'en rende compte
module.exports = (sequelize) => {
    const RefreshTokens = sequelize.define('RefreshTokens', {
        id: {
            type: Datatypes.UUID,
            defaultValue: Datatypes.UUIDV4,
            primaryKey: true
        },
        userId: {
            type:  Datatypes.UUID,
            field: 'user_id'
        },
        tokenHash: {
            type: Datatypes.STRING(500),
            field: 'token_hash',
            unique: true,
            allowNull: false
        },
        deviceInfo: {
            type: Datatypes.STRING(100),
            field: 'device_info'
        },
        ipAddress: {
            type: Datatypes.STRING(45),
            field: 'ip_address'
        },
        expireAt: {
            type: Datatypes.DATE,
            field:'expire_at',
            allowNull: false
        },
        //pour la révocation manuelle(déconnexion)
        isRevoked: {
            type: Datatypes.BOOLEAN,
            defaultValue: false,
            field: 'is_revoked',
            allowNull: false
        },
        revokedAt: {
            type: Datatypes.DATE,
            field: 'revoked_at'
        },
        lastUseAt: {
            type: Datatypes.DATE,
            field: 'last_use_at'
        }
    }, 
    {
        tableName: 'refresh_tokens',
        timestamps: true,
        underscored: true,
        updatedAt: false,

        indexes: [
            {fields: ['token_hash']},
            {fields: ['user_id']}
        ]
    }
  ),
  return RefreshTokens;
};