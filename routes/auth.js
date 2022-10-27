const { Router } = require("express");
const router = Router();
const { login } = require("../controllers/auth");

router.get("/auth/login", async(req, res) => {
    try {
        res.send(await login)
    } catch (error) {
        console.log({
            name: error.name,
            msg: error.message
        })
    }
});

module.exports = router;