var Sequelize = require('sequelize');
var db        = {};

const sequelize = new Sequelize({    
    dialect: 'sqlite',
    operatorsAliases: false,  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  
    // SQLite only
    storage: '../db/posts.sqlite'
  });

  // sequelize
  // .authenticate()
  // .then(() => {
  //   console.log('Connection has been established successfully.');
  // })
  // .catch(err => {
  //   console.error('Unable to connect to the database:', err);
  // });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;