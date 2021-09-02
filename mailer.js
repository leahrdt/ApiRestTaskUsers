//npm install nodemailer

const nodemailer = require("nodemailer");

let transport = nodemailer.createTransport({
    host:"smtp.ethereal.email",
    port:587,
    secure: false,
    auth:{
        user:"ova.bauch36@ethereal.email",
        pass:"d6zSZuwQyPdUF1AWDN"
    }
})   

transport.sendMail({
    from:"ova.bauch36@ethereal.email",
    to:"ova.bauch36@ethereal.email",
    subject:"Hola!",
    text:"Hola este va a ser mi primer mail",
    html:"<h1>Cuerpo del mail</h1>"
}).then((info)=>{
    console.log("Mensaje Enviado a", info.messageId)
})
