const { ERROR } = require("../constans");
const { registers, logins } = require('../services/auth');

const login = async (req, res) => {
    try {
        res.status(200).send(await logins(req.body.password, req.body.email));
    } catch (error) {
        console.log({
            name: error.name,
            message: error.message
        })
        res.status(400).send({ msg: ERROR });
    }
}

const register = async (req, res) => {

    try {
        res.status(200).send(await registers(req.body));
    } catch (error) {
        console.log({
            name: error.name,
            message: error.message
        })
        res.status(400).send({ msg: ERROR });
    }
}

module.exports = {
    login,
    register
};