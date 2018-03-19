const supertest = require('supertest');
const expect = require('chai'); 
var app = require('../index').app;
var models = require('../model');
var kAutor;

describe("SAMPLE unit test",function(){
  it("test 404",function(done){
    //calling ADD api
    supertest(app)
    .get('/test')        
    .expect(404)
    .end(done);    
  });
});


describe('POST /api/autor/add', function(){
    it('should save user to database', function(done){
        var data = {            
            nombre: 'test',
            email: 'test@autores.com',
            fechanacimiento: '1980-07-20'
        }
        supertest(app)
        .post('/api/autor/add')
        .send(data)
        .expect(201)
        .end((err)=>{
            if(err){
                return done(err);
            }

            done();
        });
    });
});


describe('PUT /api/autor/update/:id', function(){
    it('should update user to database', function(done){
        var data = {            
            nombre: 'nombre actualizado',
            email: 'test@autores.com',
            fechanacimiento: '1980-07-21'
        }

        var userFromDB = models.autores.findOne({where: {Email:'test@autores.com'}}).then(autor=>{           
            kAutor = autor.kAutor;
            console.log(kAutor);
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
});

describe('DELETE /api/autor/delete/:id', function(){
    it('should update user to database', function(done){                
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




