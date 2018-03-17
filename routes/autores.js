var express = require('express');
var router = express.Router();
var models = require('../model');

router.post('/add',(req, res)=>{
    debugger;
   var autor = models.autores.build({
        Nombre: req.body.nombre,
        Email: req.body.email,
        FechaNacimiento: req.body.fechanacimiento
    });

    autor.save().then((datos)=> {
        res.status(201).send({success: true, msg: 'user created'});
        res.end();
    }).then((err)=>{
        res.json();
        res.end();
    });


});

module.exports = router; 