var express = require('express');
var router = express.Router();
var models = require('../model');
const Op = models.Sequelize.Op;

router.get('/all/:id/:page',(req, res)=>{
    let limit = 5;
    let offset = 0;

    models.publicaciones.findAndCountAll({
        where: {kAutor: req.params.id}
    })
    .then((data)=>{
        let page = req.params.page;     
        let pages = Math.ceil(data.count / limit);
        offset = limit * (page - 1);

        models.publicaciones.findAll({
            where: {kAutor: req.params.id},
            limit: limit,
            offset: offset,
            order: [['DateCreated','DESC']]
        })
        .then((posts)=>{
            res.status(200).json({'data':posts, 'count':data.count, 'pages':pages});
        },(err)=>{
            res.status(500).send(err);
        }).catch((err)=>{console.log(err);});

    })
});

//POST - Add Publicacion
router.post('/add',(req, res)=>{       
   var publicacion = models.publicaciones.build({
        kAutor: req.body.key,
        Titulo: req.body.titulo,
        Mensaje: req.body.mensaje,
        DateCreated: new Date()        
    });

    publicacion.save().then((datos)=> {        
        res.status(201).send({success: true, msg: 'publicacion created'});
    },(err)=>{
        console.log(err);
        if (err.name === 'SequelizeForeignKeyConstraintError') {
            console.log('user no existe')
        }        
        res.status(500).json({success: false, msg: 'publicacion cannot be created'})})
        
});

//DELETE post
router.delete('/delete/:id',(req, res)=>{
    var id = req.params.id;
    models.publicaciones.findOne({where: {kPublicacion: req.params.id}})
    .then(dataPost=>{                
        if(dataPost){
            dataPost.destroy();
            res.status(200).json({success: true, message: 'el post ha sido borrado'});
            res.end();
        }else{
            res.status(404).json({success: false, message: 'el post no existe'});
        }

    }).catch((error)=>{
        console.log(error);
        res.status(500).json({success: false, message: 'problemas al tratar de borrar la publicacion'});
    });
});


//UPDATE
router.put('/update/:id',(req, res)=>{
    models.publicaciones.findOne({where: {kPublicacion: req.params.id}})
    .then(dataPost=>{
        if(dataPost){
            dataPost.updateAttributes({
                Titulo: req.body.titulo,
                Mensaje: req.body.mensaje                
            })
            .then((updated)=>{
                res.status(200).json({success: true, message: 'Se actualizo el post'});
            })
            .catch(()=>{
                res.status(500).json({success: false, message: 'no se actualizo el post'});
            });
        }else{
            res.status(404).json({success: false, message: 'el post no existe'});
        }
    });
});


module.exports = router; 