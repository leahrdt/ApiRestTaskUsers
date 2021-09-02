const express = require('express');
const router = express.Router();
const faker = require('faker');
const {v4: uuidv4} = require('uuid');
const normalizr = require('normalizr');


//Schemas Normalize

const schema = normalizr.schema;
const usuario = new schema.Entity("usuario")
const comentario = new schema.Entity("comentario", {autor : usuario})
const articulo = new schema.Entity("articulo",{ autor:usuario, comentario:[comentario]})

var personas = [];
for ( let i=1; i<1000; i++){
    var persona = {
        id: uuidv4(),
        name : faker.name.findName(),
        address : faker.address.streetAddress(),
        phone: faker.phone.phoneNumber(),
        }
        personas.push(persona)
}

var datos = [];
for (let i = 0;i <100; i++){
    let idPersona = Math.round(Math.random() * personas.length-1)
    let idOtraPersona = Math.round(Math.random() * personas.length-1)

    var post ={
        id:uuidv4(),
        autor : personas[idPersona],
        titulo: faker.lorem.sentence(),
        contenido: faker.lorem.paragraph(),
        comentario : [{ 
            id:uuidv4(),
            autor:personas[idOtraPersona],
            texto: faker.lorem.sentence()
        },
        {
            id:uuidv4(),
            autor:personas[idOtraPersona],
            texto: faker.lorem.sentence()
        }]
    }
    datos.push(post)
}

router.get('/users/',(req,res)=>{
    res.send(personas)
})

router.get('/post/',(req,res)=>{
    res.send(datos)
})

// - - Usando el normalize

    
router.get('/postnorm',(req,res)=>{ //lo normaliza, como sql
    res.send(normalizr.normalize(datos,[articulo])); //normalize recibe, datos y esquema.
})

module.exports = router;