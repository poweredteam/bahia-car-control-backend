const User = require('../models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const transporter = require('../mailer/mailer.js');
const { STATUS_SUCCESS,
    SUCCESS_LOGIN,
    ERROR_ROLE,
    USER_EXISTS,
    UNDEFINED,
    ROLE_ADMIN,
    ROLE_USER,
    EMAIL_ERROR,
    MSG_EMAIL,
    PWD_SUCCESFULL,
    USER_NOT_FOUND } = require('../constans')

const registers = async (data) => {
    const { name, email, password, role } = data;
    //Validacion del rol en el cual solamente debe ser 'Admin' o 'User' en su defecto
    if (role !== ROLE_USER && role !== ROLE_ADMIN && typeof role !== UNDEFINED) {
        return {
            status: ERROR_ROLE
        }
    }

    let pwdEncrypt = bcrypt.hashSync(password, 10);

    const oldUser = await User.findOne({ email });

    if (oldUser) {
        return {
            status: USER_EXISTS
        }
    }

    const user = await User.create(
        {
            name,
            email,
            password: pwdEncrypt,
            role
        })

    //Token creation
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })

    return {
        status: STATUS_SUCCESS,
        access_token: token
    }
}

const logins = async (email, res) => {
    const user = await User.findOne({ email });

    if (!user) {
        return {
            status: USER_NOT_FOUND
        }
    }

    //Access token
    const access_token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })
    //Refresh token
    const refresh_token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.REFRESH_JWT_SECRET, {
        expiresIn: '1.5h'
    })
    //Cookie access_token
    res.cookie('access_token', access_token, {
        maxAge: 3600,
        httpOnly: true,
        //secure: true
    })

    user.refreshToken = refresh_token;
    user.save();
    return {
        status: SUCCESS_LOGIN,
        name: user.name,
        token: access_token,
        refresh_token,
        role: user.role
    }
}

const refreshTokens = async (refreshToken, res) => {
    if (!refreshTokens) {
        return res.status(401).json({ message: "Algo ocurrio mal" });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
        return res.status(401).json({ message: "Algo ocurrio mal" });
    }
    const new_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });

    return {
        message: 'Nuevo token de acceso generado',
        token: new_token
    }
}

const forgotPasswords = async (email) => {

    if (!email) {
        return {
            status: 400,
            message: EMAIL_ERROR
        }
    }

    let verificationLink;
    let emailStatus = 'Ok';
    let user;

    try {
        user = await User.findOne({ email })
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET_RESET, {
            expiresIn: '1h'
        })
        verificationLink = `${process.env.FRONTEND_URL}/auth/new-password?token=${token}`;
        user.resetToken = token;
        user.save();
    } catch (error) {
        return {
            message: USER_NOT_FOUND,
            error
        }
    }

    try {
        // send mail with defined transport object
        await transporter.sendMail({
            from: `'"Forgot Password API_app 👻" <${process.env.EMAIL_ACCOUNT}>'`, // sender address
            to: user.email, // list of receivers
            subject: "Notificación cambio de contraseña ✔", // Subject line
            html: `<b>Por favor da click en este enlace o pegalo en tu navegador para completar el proceso:</b>
            <a href="${verificationLink}">${verificationLink}</a>`, // html body
        });
    } catch (error) {
        return {
            message: "El email no pudo ser enviado",
            error
        }
    }
    return {
        status: emailStatus,
        message: MSG_EMAIL
    }
}

const createNewPasswords = async (data) => {
    const { newPassword } = data.body
    const resetToken = data.headers['reset']
    if (!resetToken && newPassword) {
        return {
            status: 400,
            message: "Todos los campos son requeridos"
        }
    }

    // Password validation
    if (newPassword.length < 8) {
        return {
            status: 404,
            msg: "Por favor ingresa un password de maximo 8 carateres",
        };
    }

    let user;
    let jwtPayload;
    let pwdEncrypt;

    try {
        jwtPayload = jwt.verify(resetToken, process.env.JWT_SECRET_RESET);
        user = await User.findOne({ email: jwtPayload.email });
    } catch (error) {
        return {
            status: 400,
            message: error
        }
    }

    pwdEncrypt = bcrypt.hashSync(newPassword, 10);
    user.password = pwdEncrypt;

    try {
        await user.save();
    } catch (error) {
        return {
            status: 400,
            message: error
        }
    }

    return {
        status: 200,
        message: PWD_SUCCESFULL
    }

}

module.exports = {
    registers,
    logins,
    refreshTokens,
    forgotPasswords,
    createNewPasswords
};