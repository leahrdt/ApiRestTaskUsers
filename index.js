//npm init --yes
//npm init express //npm start (se modifico el package.json)
//npm install nodemon -D (-D, q es solo de desarollo) //npm run dev
//npm install morgan (para ver las peticiones que me llegan)
//npm install mongoose
//Para meter react dentro de esta app...
//npm install webpack -D
//npm install webpack-cli -D

const express = require('express');
const morgan = require('morgan');
const connectMongoDB = require("./connectDB/connectDB"); //1.0.0

const path = require('path')
const app = express();

//Settings
app.set('port', 8080); //para que agarre el host que ponga el servidor de la web que suba, sino puerto 3000 mio

//Connect with MongoDB
connectMongoDB();

//Middlewares //Funciones que se ejecutan antes de las rutas.
app.use(morgan('dev')); //para conocer las respuestas que envio cuando me piden cosas.
app.use(express.json()); //comprueba si el dato que llega es un json. (si lo es se puede acceder, y tmb se puede enviar)
app.use((req, res, next) => { //Para problemas de Cors
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Routes
app.use('/api/task', require('./routes/task.routes')) //app.usa.. y requiere el archivo...
app.use('/usuarios', require('./routes/users.routes')) //app.usa.. y requiere el archivo...
app.use('/faker', require('./routes/faker.routes')) //app.usa.. y requiere el archivo...

//Static Files
app.use(express.static(path.join(__dirname, 'public'))) //esto es para que agarre el html que esta en public

//Starting Server
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`)
})