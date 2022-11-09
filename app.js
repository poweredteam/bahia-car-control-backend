const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const auth = require("./routes/auth");
const services = require('./routes/service');
const license = require('./routes/license');
const client = require('./routes/client');
const user = require('./routes/user');
const tech = require('./routes/tech');

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        credentials: true,
    }
))

app.use("/", auth);
app.use("/", services);
app.use("/", license);
app.use("/", client);
app.use("/", user);
app.use("/", tech);


module.exports = {app};