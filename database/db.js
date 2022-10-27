const mongoose = require('mongoose');
const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const dbConnect = async() => {
    try {
        await mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
            ssl: true,
            sslValidate: true,
            useNewUrlParser: true
        });
        console.log("conexion exitosa")    
    } catch (error) {
        console.log(error);
        throw new Error("Error en la conexion")
    }
}

module.exports = { dbConnect }; 