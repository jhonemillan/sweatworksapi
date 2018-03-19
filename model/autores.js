module.exports = function(sequelize, DataTypes){
    var autores = sequelize.define('autores',{
        kAutor: { type: DataTypes.INTEGER, primaryKey: true,autoIncrement: true, allowNull: false},
        Nombre: {type: DataTypes.STRING, allowNull: false},
        Email: {type: DataTypes.STRING, allowNull: false, unique:true},
        FechaNacimiento: {type: DataTypes.STRING, allowNull: false}
    });

    return autores;
}