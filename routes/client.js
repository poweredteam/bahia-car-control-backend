const { Router } = require("express");
const { getClients, createClients, licenseClient, getClientsByIdAndLicenses } = require("../controllers/client");
const router = Router();

router.get("/client", getClients)
router.post("/client", createClients)
router.post("/clientsandlicenses", getClientsByIdAndLicenses)
router.put("/licenseClient", licenseClient)

module.exports = router;