const User = require('../models/User');
const bcrypt = require('bcryptjs');

const { EMAIL_ERROR, USER_NOT_FOUND, ERROR_LOGIN } = require('../constans')

const loginValidator = async (req, res, next) => {

    // Email validation 
    const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    if (!validEmail.test(req.body.email)) {
        return res.status(401).json({
            status: false,
            msg: EMAIL_ERROR
        });
    }

    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        return res.status(404).send({ token: null, message: ERROR_LOGIN })
    }

    if (user.status === false) {
        return res.status(404).send({ token: null, message: USER_NOT_FOUND })
    }

    const matchPassword = await bcrypt.compareSync(req.body.password, user.password)
    if (!matchPassword) {
        return res.status(404).send({ token: null, message: ERROR_LOGIN })
    }
    next();
}

module.exports = { loginValidator };