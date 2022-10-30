const { Router } = require("express");
const { getClients, createClients, licenseClient } = require("../controllers/client");
const router = Router();

router.get("/client", getClients)
router.post("/client", createClients)
router.put("/licenseClient", licenseClient)

module.exports = router;