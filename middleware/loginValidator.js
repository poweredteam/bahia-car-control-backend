const User = require('../models/User');
const { STATUS_SUCCESS, ERROR_LOGIN, SUCCES_LOGIN } = require('../constans')

const loginValidator = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(404).send(ERROR_LOGIN)
    }

    if (req.body.password !== user.password) {
        return res.status(404).send(ERROR_LOGIN)
    }
    next();
}

module.exports = { loginValidator };