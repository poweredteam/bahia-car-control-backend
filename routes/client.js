const { Router } = require("express");
const { getClients, createClient } = require("../controllers/client");
const router = Router();

router.get("/client", getClients)

router.post("/client", createClient)

module.exports = router;