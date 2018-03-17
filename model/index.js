var Sequelize = require('sequelize');
var db        = {};

const sequelize = new Sequelize('null', 'null', 'null',{    
    dialect: 'sqlite',    
    storage: './db/posts.sqlite',
    define: {  
      timestamps: false,
      freezeTableName: true,
      underscored: true   
  }

  });

  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.autores = db.sequelize.import('./autores');

module.exports = db;