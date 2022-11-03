const { ERROR } = require("../constans")
const { createClient, RelatedLicenseClient, getClient, getClientByIdAndLicense } = require("../services/clients")



const getClients = async(req, res) => {
    try {
        res.status(200).send(await getClient())
    } catch (error) {
        console.log({
            name: error.name,
            msg: error.message
        })
        res.status(400).send(ERROR)
    }
}

const getClientsByIdAndLicenses = async(req, res) => {
    const { identification, license_plate } = req.body
    //console.log(req.body)
    try {
        res.status(200).send(await getClientByIdAndLicense(identification, license_plate))
    } catch (error) {
        console.log({
            name: error.name,
            msg: error.message,
            path: "controller"
        })
        res.status(400).send(ERROR)
    }
}

const createClients = async(req, res) => {
    const { identification, name, lastName, phone, email, license_plates } = req.body
    try {
        res.status(200).send(await createClient({identification, name, lastName, phone, email, license_plates}))
    } catch (error) {
        console.log({
            name: error.name,
            msg: error.message,
            path: "controller"
        })
        res.status(400).send(ERROR)
    }
}

const licenseClient = async(req, res) => {
    const { identification, license_plate } = req.body;
    try {
        res.status(200).send(await RelatedLicenseClient(identification, license_plate))
    } catch (error) {
        console.log({
            name: error.name,
            msg: error.message,
            path: "controller"
        })
        res.status(400).send(ERROR)
    }
}

module.exports = {
    getClients,
    createClients,
    licenseClient,
    getClientsByIdAndLicenses
}