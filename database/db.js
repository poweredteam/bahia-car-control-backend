const mongoose = require('mongoose');
const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const dbConnect = async() => {
    try {
        await mongoose.connect(`mongodb+srv://superadmin:R4m1r0.8489@ramicluster.xrstwx3.mongodb.net/cronometer`, {
        // await mongoose.connect(`mongodb://localhost:27017/fh`, {
            ssl: true,
            sslValidate: true,
            useNewUrlParser: true
        });
        console.log("Conectado a database mongo")    
    } catch (error) {
        console.log(error);
        throw new Error("Error en la conexion")
    }
}

module.exports = { dbConnect }; 