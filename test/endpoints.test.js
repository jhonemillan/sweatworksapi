const supertest = require('supertest');
const expect = require('chai').expect; 
var app = require('../index').app;
var models = require('../model');
var kAutor;

describe("Tests Autores CRUD",function(){
    it("test 404",function(done){
        //calling ADD api
        supertest(app)
        .get('/test')        
        .expect(404)
        .end(done);    
    });

    it('POST - should save user to database', function(done){
        var data = {            
            nombre: 'test',
            email: 'test@autores.com',
            fechanacimiento: '1980-07-20'
        }
        supertest(app)
        .post('/api/autor/add')
        .send(data)
        .expect(201)
        .expect((res)=>{
            expect(res.body.success).to.equal(true);
        })
        .end((err)=>{
            if(err){
                return done(err);
            }

            done();
        });
    });

    it('PUT - should update user in database', function(done){
        var data = {            
            nombre: 'nombre actualizado',
            email: 'test@autores.com',
            fechanacimiento: '1980-07-21'
        }

        var userFromDB = models.autores.findOne({where: {Email:'test@autores.com'}}).then(autor=>{           
            kAutor = autor.kAutor;            
            supertest(app)
            .put('/api/autor/update/' + autor.kAutor)
            .send(data)
            .expect(200)
            .end((err)=>{
                if(err){
                    return done(err);
                }
                done();
            });
        });   
    });

    it('DELETE - should delete user from database', function(done){                
        supertest(app)
        .delete('/api/autor/delete/' + kAutor)            
        .expect(200)
        .end((err)=>{
            if(err){
                return done(err);
            }
            done();
        });
    });
});

describe("Tests Publicaciones CRUD",function(){
let kPublicacion;

    it('POST - should save publicacion to database', function(done){
        models.autores.findAll({
            limit: 1,
            raw: true
        })
        .then((data)=>{            
            var publicacion ={
                key: data[0].kAutor,
                titulo: 'sweatworks',
                mensaje: 'Mensaje de prueba'                
            };
            supertest(app)
            .post('/api/publicacion/add')
            .send(publicacion)
            .expect(201)
            .expect((res)=>{
                expect(res.body.success).to.equal(true);
            })
            .end((err)=>{
                if(err){
                    return done(err);
                }
                done();
            });
        })
        .catch((err)=>{console.log(err);});
    });

    it('DELETE - should delete from database', function(done){             
        models.publicaciones.findAll({
            where: { titulo: 'sweatworks'},
            raw: true
        })
        .then((data)=>{            
           if(data){
            supertest(app)
            .delete('/api/publicacion/delete/' + data[0].kPublicacion)            
            .expect(200)
            .end((err)=>{
                if(err){
                    return done(err);
                }
                done();
            });
           }else{
                return done(err);
           } 
        });        
    });
})

