const { Datatypes } = require('sequelize');

//stocke les types d'évènements
module.exports= (sequelize) => {
    const Categories = sequelize.define('Categories', {
        id: {
            type: Datatypes.UUID,
            defaultValue: Datatypes.UUIDV4,
            primaryKey: true
        },
        name : {
            type: Datatypes.STRING(100),
            unique: true,
            allowNull:false
        },
        //reste stable memesi l nom change ex 'Concert' restera 'concert'
        slug: {
            type: Datatypes.STRING(50),
            unique: true,
            allowNull: false
        },
        description: {
            type: Datatypes.TEXT,
        },
        //nom de l'icon de l'évènement dans l'app
        icon: {
            type: Datatypes.STRING(100)
        },
        //couleur propre d'un évènement dans l'app
        color: {
            type: Datatypes.STRING(10)
        },
        //pour déactiver les anciens évenements et garder leurscategorie
        isActive: {
            type: Datatypes.BOOLEAN,
            defaultValue: true,
            field: 'is_active',
            allowNull: false
        },
        //ordre d'affichage des categories dans l'interface pour éviter des trucs aléatoires
        position: {
            type: Datatypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        }
    },{
        tableName: 'categories',
        timestamps: true,
        underscored:true,
        updatedAt: false,

        indexes: [
            {fields: ['name']},
            {fields: ['slug']},
            {fields: ['is_active']}
        ]
    })
    return Categories;
}