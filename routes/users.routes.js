//para users
//npm i jsonwebtoken
//npm i bcryptjs

const express = require('express');
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const llaves = require("../connectDB/mongoKeys");

//Schemas
const User = require('../model/User')

//Registro de Usuario
router.post("/register", (req,res) => { 
    User.findOne({email: req.body.email}) 
        .then(user => {
            if(user){
                return res.json({error: "El Usuario ya existe!"});
            } else { 
                const newUser = new User({ 
                    user: req.body.user,
                    email: req.body.email,
                    password: req.body.password
                });
                
                bcrypt.genSalt(10,(err,salt) => { //metodo genSalt de brypt, le paso un 10, cuanto mayor este numero mas codificado va a estar.
                    bcrypt.hash(newUser.password, salt, (error, hash) => { //dentro de hash es donde se pone el scrip que se va a encriptar, lo cual va a ser newUser.password, tmb se le debe pasa el salt
                        if(err) return err;
                        newUser.password = hash; 
                        // Envio el usuario a la BD
                        newUser.save() 
                            .then(user => res.status(200).json(user)) 
                            .catch(err => res.status(400).json(err));
                    });
                });
            }
        });
}); 

//Login de Usuario
router.post("/login", async (req,res) => {

    const email = req.body.email; 
    const password = req.body.password;

    const user = await User.findOne({email})
    console.log("usuario registrado",user)
    if(!user){ 
        return res.json({Error: "Usuario no Encontrado!"})
    } 
    //Uso bcrypt para encriptar el pass, y COMPARO (compare) 
    bcrypt.compare(password, user.password)
    .then((hacenMatch) => { 
        if(hacenMatch){
            const payload = {id: user.id, user: user.user}; 
            jwt.sign(
                payload, 
                llaves.miLlaveSecreta, //El servidor solo va a poder decodificar este token si le paso mi llave secreta.
                {expiresIn: 3600}, //duracion del token en la base de dato 
                (err, token) => { //se le pasa un callback donde se instancia un error y si la operacion es excitosa me devuelve el token 
                    res.status(200).json({
                        sucess: true, 
                        token: "Bearer " + token 
                    })
                }
            );
        } else {
            return res.json({Error: "Password Incorrecto"});
        }
    })
    ;
}); 

module.exports = router; 