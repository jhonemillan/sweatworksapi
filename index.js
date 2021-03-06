var sqlite3 = require('sqlite3').verbose();
var bodyparser = require('body-parser');
var Sequelize = require('sequelize');
var express = require('express');
var helmet = require('helmet')
var cors = require('cors');
var app = express();
var port = process.env.port || 3000;
//routes
var autorRoute = require('./routes/autores');
var publicacionRoute = require('./routes/publicaciones');

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(helmet());
app.use('/api/autor',autorRoute);  
app.use('/api/publicacion',publicacionRoute);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, ()=>{
    console.log('Se conecta al puerto ' + port)
});

// Error Handling
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
});

module.exports = {app};