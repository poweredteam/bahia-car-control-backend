const User = require('../models/User');
const { STATUS_SUCCESS, ERROR_LOGIN, SUCCES_LOGIN } = require('../constans')

const registers = async (data) => {
    const user = await User.create(data)
    return {
        status: STATUS_SUCCESS,
        msg: user
    }
}

const logins = async (password, email) => {
    const user = await User.findOne({ email });
    if (user && password === user.password) {
        return {
            status: SUCCES_LOGIN,
            msg : user.email
        }
    }
}

module.exports = { registers, logins };