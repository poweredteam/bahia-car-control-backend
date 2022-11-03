const { Router } = require("express");
const { getLicenses, createLicenses, deleteLicenses } = require("../controllers/license");
const router = Router();

router.get("/license", getLicenses)
router.post("/license", createLicenses)
router.delete("/license", deleteLicenses)

module.exports = router;