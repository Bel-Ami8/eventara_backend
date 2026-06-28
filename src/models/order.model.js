const { Datatypes } = require('sequelize');

//permet de tracer les paiement groupée et paiement simple en gérant les QR codesunique pour chacun
module.exports = (sequelize)=>  {
    const Orders = sequelize.define('Orders', {
    id: {
        type: Datatypes.UUID,
        defaultValue: Datatypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: Datatypes.UUID,
        allowNull: false,
        field: 'user_id'
    },
    ticketTypeId: {
        type: Datatypes.UUID,
        field: 'ticket_type_id',
        allowNull: false
    },
    quantity: {
        type: Datatypes.INTEGER,
        allowNull: false
    },
    unitPrice: {
        type: Datatypes.DECIMAL(12,0),
        field: 'unit_price',
        allowNull: false
    },
    totalPrice: {
        type: Datatypes.DECIMAL(12,0),
        field: 'total_price',
        allowNull: false
    },
    status: {
        type: Datatypes.ENUM('en_attente', 'payé', 'annulé', 'expiré'),
        defaultValue: 'en_attente',
        allowNull: false
    },
    paymentProvider: {
        type: Datatypes.STRING(50),
        field: 'payment_provider'
    },
    paymentReference: {
        type: Datatypes.STRING(200),
        field: 'payment_reference',
        unique: true
    },
    //code du promoteur  si la commande  vient d'un lien de démarcheur
    referalCode: {
        type: Datatypes.STRING(20),
        field: 'refferal_code',
    },
    expiredAt: {
        type: Datatypes.DATE,
        field: 'expired_at',
        allowNull: false
    }
    },{
        tableName: 'orders',
        timestamps: true,
        underscored: true,

        indexes: [
            {fields: ['user_id']},
            {fields: ['status']},
            {fields: ['expire_at']}
        ]
    })
    return Orders;
}