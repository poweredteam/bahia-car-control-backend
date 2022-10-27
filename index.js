const { app } = require("./app");
const { PORT } = process.env;
const { dbConnect } = require("./database/db");

app.listen(PORT, () => {
    console.log("servidor corriendo en el puerto ", PORT)
    dbConnect();
});