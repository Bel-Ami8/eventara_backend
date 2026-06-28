const { Datatypes }= require('sequelize');

//permet de catéegoriser les types de tickets et  leurs infos respectives
module.exports = (sequelize) => {
    const TicketTypes = sequelize.define('TicketTypes',{
       id: {
        type: Datatypes.UUID,
        defaultValue: Datatypes.UUIDV4,
        primaryKey:true
       },
       eventId: {
        type: Datatypes.UUID,
        allowNull: false,
        field: 'event_id'
       },
       //ex basic, vip etc
       name: {
        type: Datatypes.STRING(20),
        allowNull: false
       },
       description: {
        type: Datatypes.TEXT
       },
       price: {
        type: Datatypes.DECIMAL(12,0),
        defaultValue: 0,
        allowNull: false
       },
       //nombre de places
       quota: {
        type: Datatypes.INTEGER,
        allowNull: false
       },
       //places restantes
       availlable: {
        type: Datatypes.INTEGER, 
        allowNull: false
       }
    },{
        tableName: 'ticket_types',
        timestamps:true,
        underscored: true
    })
    return TicketTypes;
}