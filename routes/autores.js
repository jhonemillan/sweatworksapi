var express = require('express');
var router = express.Router();
var models = require('../model');

router.post('/add',(req, res)=>{   
   var autor = models.autores.build({
        kAutor: req.body.key,
        Nombre: req.body.nombre,
        Email: req.body.email,
        FechaNacimiento: req.body.fechanacimiento
    });

    autor.save().then((datos)=> {        
        res.status(201).send({success: true, msg: 'user created'});
    },(err)=>{
        console.log(err);        
        res.status(500).json({success: false, msg: 'user cannot be created'})})

});

router.get('/getAutor/:id',(req, res)=>{
    models.autores.findAll({
        where: {kAutor: req.params.id}
    })
    .then((data)=>{
        res.status(200).json(data);
    },(err)=>{
        res.status(500).send(err);
    }).catch((err)=>{console.log(err);});
});


router.get('/getAutors/all',(req, res)=>{
    models.autores.findAll()
    .then((data)=>{
        res.status(200).json(data);
    },(err)=>{
        res.status(500).send(err);
    }).catch((err)=>{console.log(err);});
});

router.delete('/delete/:id',(req, res)=>{
    var id = req.params.id;
    models.autores.findOne({where: {kAutor: req.params.id}})
    .then(autor=>{        
        //console.log(autor);
        if(autor){
            autor.destroy();
            res.status(200).json({success: true, message: 'el autor ha sido borrado'});
            res.end();
        }else{
            res.status(404).json({success: false, message: 'el autor no existe'});
        }

    }).catch((error)=>{
        console.log(error);
        res.status(500).json({success: false, message: 'problemas al tratar de borrar el autor'});
    });
});

router.put('/update/:id',(req, res)=>{
    models.autores.findOne({where: {kAutor: req.params.id}})
    .then(autor=>{
        if(autor){
            autor.updateAttributes({
                Nombre: req.body.nombre,
                Email: req.body.email,
                FechaNacimiento: req.body.fechanacimiento
            })
            .then((updated)=>{
                res.status(200).json({success: true, message: 'Se actualizo el autor'});
            })
            .catch(()=>{
                res.status(500).json({success: false, message: 'no se actualizo el autor'});
            });
        }else{
            res.status(404).json({success: false, message: 'el autor no existe'});
        }
    });
});

module.exports = router; 