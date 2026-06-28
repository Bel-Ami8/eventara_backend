const { Datatypes }= require('sequelize');

module.exports = (sequelize) =>  {
    const Tickets = sequelize.define('Tickets', {
        id: {
            type: Datatypes.UUID,
            defaultValue: Datatypes.UUIDV4,
            primaryKey: true
        },
        orderId: {
            type: Datatypes.UUID,
            field: 'order_id',
            allowNull: false
        },
        ticketTypeId: {
            type: Datatypes.UUID,
            field: 'ticket_type_id',
            allowNull: false
        },
        //nom de la personne qui utilise ce billet
        attendeeName: {
            type: Datatypes.STRING(50),
            field: 'attendee_name'
        },
        attendeePhone: {
            type: Datatypes.STRING(20),
            field: 'attendee_phone'
        },
        //payload généré, signé HMAC-SHA256 unique pour éviter que les qrcode  soient identiques
        qrCodeData: {
            type: Datatypes.TEXT,
            field: 'qr_code_data', 
            unique: true,
            allowNull: false
        },
        //url de l'image qr code généré après confirmation de paiement
        qrCodeUrl: {
            type: Datatypes.STRING(500),
            field: 'qr_code_url'
        },
        status: {
            type: Dataypes.ENUM('en_attente', 'payé','utilisé', 'annulé'),
            defaultValue: 'en_attente',
            allowNull: false
        },
        usedAt: {
            type: Datatypes.DATE,
            field: 'used_at',
            allowNull: false
        },
        scannedBy: {
            type: Datatypes.UUID,
            field: 'scanned_by',
            allowNull: false
        }
    },{
        tableName: 'tickets',
        timestamps: true,
        underscored: true,

        indexes: [
            {fields: ['order_id']},
            {fields: ['ticket_type_id']},
            {fields: ['status']}
        ]
    })
    return Tickets;
};