const Client = require("../models/Client");
const License = require("../models/License");

const getLicense = async() => {
    const licenses = await License.find()
    return licenses
}

const createLicense = async(license) => {
    const licenseCreated = await License.create(license);
    return {
        status: "license created",
        msg: licenseCreated
    }
}

module.exports = {
    getLicense,
    createLicense
}