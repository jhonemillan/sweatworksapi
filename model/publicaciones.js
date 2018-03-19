module.exports = (sequelize, DataTypes) => {
    var publicaciones = sequelize.define('publicaciones',{
        kPublicacion: { type: DataTypes.INTEGER, primaryKey: true,autoIncrement: true, allowNull: false},
        kAutor: {type: DataTypes.INTEGER, allowNull: false},
        Titulo: {type: DataTypes.STRING, allowNull: false},
        Mensaje: {type: DataTypes.STRING, allowNull: false},
        DateCreated: {type: DataTypes.DATE, allowNull: false}
    });

    publicaciones.associate = function(model){
        model.publicaciones.belongsTo(model.autores, {foreignKey: 'kAutor'});
    }

    return publicaciones;
}