const { Router } = require("express");
const { getLicenses, createLicenses } = require("../controllers/license");
const router = Router();

router.get("/license", getLicenses)
router.post("/license", createLicenses)

module.exports = router;