const { app } = require("./app");
const { PORT } = process.env;
const { dbConnect } = require("./database/db");

app.listen(8080, () => {
    console.log("servidor corriendo en el puerto ", 8080)
    dbConnect();
});