const express = require("express");
require("dotenv").config();
const cors = require("cors");
const auth = require("./routes/auth");
const services = require('./routes/service');
const license = require('./routes/license');
const client = require('./routes/client');

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use("/", auth);
app.use("/", services);
app.use("/", license);
app.use("/", client);


module.exports = {app};