const { Datatypes }= require('sequelize');

//trace toute tentative de  payement via chaque porte feuille électronique utilisé
module.exports = (sequelize) => {
    const Payment = sequelize.define('Payment', {
        id: {
            type: Datatypes.UUID,
            defaultValue:Datatypes.UUIDV4,
            primaryKey: true
        },
        orderId: {
            type: Datatypes.UUID,
            field: 'order_id',
            allowNull: false
        },
        amount: {
            type: Datatypes.DECIMAL(12,0),
            allowNull: false
        },
        //type de dévise,stockée explicitement pour  l'internationalisation future
        currentcy: {
            type: Datatype.STRING(3),
            allowNull: false,
            defaultValue: 'XAF'
        },
        //agrégateur
        provider: {
            type: Datatypes.STRING(20),
            allowNull: false
        },
        //reference unique du provider
        providerTransactionId: {
            type: Datatypes.STRING(200),
            unique: true,
            field: 'provider_transaction_id'
        },
        //numéro de téléphone utilisé pour la transaction
        phoneNumber: {
            type: Datatypes.STRING(20),
            allowNull: false,
            field: 'phone_number'
        },
        status: {
            type: Datatypes.ENUM('en_attente','en_cours', 'complétée','échouée', 'annulée'),
            defaultValue: 'en_attente',
            allowNull: false
        },
        faillureReason: {
            type: Datatypes.TEXT,
            field: 'faillure_reason'
        },
        //début de la tentative
        initiliazeAt: {
            type: Datatypes.DATE,
            field: 'initialize_at',
            allowNull: false
        },
        confirmedAt: {
            type: Datatypes.DATE,
            field: 'confirmed_at'
        },
        //donné brute  du webhook utile en cas  de litige  avec le provider
        metadata: {
            type: Datatypes.JSONB 
        }
    },{
        tableName: 'payments',
        timestamps: true,
        underscored: true,
        updated_at: false,
        created_at: false,

        indexes: [
            {fields: ['order_id']},
            {fields: ['status']},
            {fields: ['provider']}
        ]
    })
    return Payment;
}