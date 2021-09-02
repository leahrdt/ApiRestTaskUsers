
const mongoose = require("mongoose");

const { MongoURI , MongoURILocal } = require("./mongoKeys");

function connectDB(){
    mongoose.connect( 
        MongoURI,
        {// va de libro
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }
    )
    .then(() => {
        console.log("Conneccion con Mongo Exitosa!");
    })
    .catch(err => console.log(err));
}

module.exports = connectDB; //lo exportamos para importarlo a index.js