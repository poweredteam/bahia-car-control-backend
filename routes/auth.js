const { Router } = require("express");
const router = Router();
const { login, register } = require("../controllers/auth");
const {loginValidator} = require('../middleware/loginValidator');

router.post("/auth/login", loginValidator,login);
router.post("/auth/register" , register);

module.exports = router;