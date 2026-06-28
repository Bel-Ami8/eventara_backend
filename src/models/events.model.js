const { Datatypes } = require('sequelize');

module.exports = (sequelize) => {
    const Events = sequelize.define('Events', {
        id: {
            type: Datatypes.UUID,
            defaultValue: Datatypes.UUIDV4,
            primaryKey: true
        },
        organizerId : {
            type: Datatypes.UUID,
            field: 'organizer_id',
            allowNull: false
        },
        categoryId: {
            type: Datatypes.UUID, 
            field: 'category_id'
        },
        description: {
            type: Datatypes.TEXT,
            allowNull:false
        },
        title: {
            type: Datatypes.STRING(200),
            allowNull: false
        },
        coverImageUrl: {
            type: Datatypes.STRING(200),
            field: 'cover_image_url'
        },
        //localisation de l'évènement
        locationName: {
            type: Datatypes.STRING(100),
            field: 'location_name',
            allowNull: false
        },
        locationLat: {
            type: Datatypes.DECIMAL(9,6),
            field: 'location_lat',
            validate: {
                min: -90,
                max: 90
            }
        },
        locationLong: {
            type: Datatypes.DECIMAL(9,6),
            field:'location_long',
            validate: {
                min: -180,
                max: 180
            }
        },
        startDate: {
            type: Datatypes.DATE,
            field: 'start_date',
            allowNull: false
        },
        endDate:{
            type: Datatypes.DATE,
            field: 'end_date'
        },
        status: {
            type: Datatypes.ENUM('brouillon','publié','terminé', 'complet','annulé'),
            defaultValue: 'brouillon',
            allowNull: false
        }
    },{
        tableName: 'events',
        timestamps: true,
        underscored: true,

        indexes: [
            {fields: ['organizer_id']},
            {fields: ['status']},
            {fields: ['start_date']},
            {fields: ['category_id']}
        ]
    })
    return Events;
}