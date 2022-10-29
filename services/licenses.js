const Client = require("../models/Client");
const License = require("../models/License");

const getLicense = async() => {
    const licenses = await License.find()
    return {
        status: "licenses",
        msg: licenses
    }
}

const createLicense = async(license, id) => {
    const client = await Client.findOne({identification: id})
    const licenseCreated = await License.create(license).populate("client", client.name);
    //return licenseCreated
    return {
        status: "created",
        msg: licenseCreated
    }
}

module.exports = {
    getLicense,
    createLicense
}