//Modelo de datos que voy a enviar y recibir
const mongoose = require('mongoose');

//creacion del esquema de dato
const {Schema} = mongoose; 

//como va a lucir el esquema
const TaskSchema = new Schema({ 
    email:{type: String, required:true},
    title:{type: String, required:true},
    description: {type: String, required:true}
})

//como exporto mi esquema para utilizar en mi aplicacion
module.exports = mongoose.model('Task',TaskSchema) 

//importar esto en task de routes