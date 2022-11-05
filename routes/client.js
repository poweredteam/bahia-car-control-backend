const { Router } = require("express");
const { getClients, createClients, licenseClient, getClientsByIdAndLicenses, deleteClients } = require("../controllers/client");
const router = Router();

router.get("/client", getClients)
router.post("/client", createClients)
router.delete("/client/:identification", deleteClients)
router.post("/clientsandlicenses", getClientsByIdAndLicenses)
router.put("/licenseClient", licenseClient)

module.exports = router;