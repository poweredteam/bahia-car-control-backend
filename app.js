const express = require("express");
require("dotenv").config();
const cors = require("cors");
const auth = require("./routes/auth");
const services = require('./routes/service');

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use("/", auth);
app.use("/", services);

module.exports = {app};