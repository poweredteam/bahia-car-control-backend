const nodemailer = require("nodemailer");
require('dotenv').config();

//Send Email

const transporter = nodemailer.createTransport({
    host: process.env.HOST_GMAIL,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_ACCOUNT, // generated ethereal user
        pass: process.env.PWD_EMAIL, // generated ethereal password
    },
});

transporter.verify().then(()=>{
    console.log("Listo para enviar emails");
});

module.exports = transporter;
