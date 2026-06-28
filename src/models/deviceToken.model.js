const { Datatypes }= require('sequelize');

//permet l'envoi des notifications push via firebase  notifications 
//car firebase ne connait que les appareils
module.exports=(sequelize) =>{
    const DeviceTokens = sequelize.define('DeviceTokens',{
        id: {
            type: Datatypes.UUID,
            defaultValue: Datatypes.UUIDV4,
            primaryKey: true
        },
        userId: {
            type: Datatypes.UUID,
            field: 'user_id'
        },
        fcmToken: {
            type: Datatypes.TEXT,
            unique: true,
            field: 'fcm_token',//un appareil = un seul fcmtoken
            allowNull: false
        },
        //android,ios,web pour adapter les notifications en fonction de ces platforms
        platform: {
            type: Datatypes.STRING(100),
            defaultValue: 'android',
            allowNull: false
        },
        deviceName: {
            type: Datatypes.STRING(100),
            field: 'device_name'
        },
        deviceModel: {
            type: Datatypes.STRING(50),
            field: 'device_model'
        },
        //permet de savoir quels utilisateurs sont sur l'ancienne version avec  bug
        //pour les pousser à aller sur la nouvelle version
        appVersion: {
            type: Datatypes.STRING(50),
            field: 'app_version'
        },
        //pour garder l'historique d'un appareil tant que l'app est installée
        //passe à false lorsque l'app est désinstallée sans supprimer l'historique
        isActive: {
            type: Datatypes.BOOLEAN,
            field: 'is_active',
            defaultValue: true,
            allowNull: false
        },
        //dernière notification envoyée à
        lastUsedAt: {
            type: Datatypes.DATE,
            field: 'last_used_at'
        }
    },
    {
        tableName: 'device_tokens',
        timestamps: true,
        undescored: true
    }
  )
  return DeviceTokens;
};