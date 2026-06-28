const { Datatypes } =require('sequelize');

//traces immuable de toute action sur la plateforme
module.exports = (sequelize) => {
    const AuditLog = sequelize.define('AuditLog', {
        id: {
            type: Datatypes.UUID,
            defaultValue: Datatypes.UUIDV4,
            primaryKey: true
        },
        userId: {
            type: Datatypes.UUID,
            field: 'user_id',
            allowNull:false
        },
        action: {
            type: Datatypes.STRING(100),
            allowNull: false
        },
        //entité concernée par l'action
        entityType: {
            type:Datatypes.STRING(50),
            field: 'entity_type'
        },
        entityId: {
            type: datatypes.UUID,
            field: 'entity_id'
        },
        //valeur avant la modification
        oldValue: {
            type:Datatypes.JSONB,
            field: 'old_value'
        },
        newValue: {
            type: Datatypes.JSONB,
            field: 'new_value'
        },
        ipAddress: {
            type: Datatypes.STRING(45),
            field: 'ip_address'
        },
        //contexte de l'action etc
        metadata: {
            type: Datatypes.JSONB
        }
    },{
        tableName: 'audit_log',
        timestamps: true,
        underscored: true,
        
        indexes: [
            {fields: ['user_id']},
            {fields: ['action']},
            {fields: ['entity_type','entity_id']},
            {fields: ['created_at']}
        ]
    })
    return AuditLog;
}