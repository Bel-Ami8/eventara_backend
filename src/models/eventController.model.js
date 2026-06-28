const { Datatypes } = require('sequelize');

//pour définir les controleurs
module.exports = (sequelize) => {
    const EventControllers = sequelize.define('EventControllers',{
        id: {
            type: Datatypes.UUID,
            defaultValue: Datatypes.UUIDV4,
            primaryKey: true
        },
        eventId: {
            type: Datatypes.UUID,
            field:'event_id',
            allowNull:false
        },
        //quel utilisateur est controleur
        userId: {
            type: Datatypes.UUID,
            field: 'user_id',
            allowNull:false
        },
        //quel organisateur l'a assigné
        assignedBy: {
            type: Datatypes.UUID,
            field: 'assigned_by',
            allowNull: false
        }, 
        //retirer l'accès sans supprimer l'historique
        isActive: {
            type: Datatypes.BOOLEAN,
            field: 'is_active',
            defaultValue: true,
            allowNull: false
        }
    },{
        tableName: 'event_controllers',
        timestamps:true,
        underscored: true,
        updatedAt: false,

        indexes: [
            {fields: ['event_id']},
            {fields: ['user_id']}
        ]
    })
    return EventControllers;
}