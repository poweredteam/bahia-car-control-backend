const { getLicense, createLicense } = require('../services/licenses')


const getLicenses = async(req, res) => {
    try {
        res.status(200).send(await getLicense())
    } catch (error) {
        console.log(error)
    }
}

const createLicenses = async(req, res) => {
    const { license_plate } = req.body;
    try {
        res.json(await createLicense({license_plate}))
    } catch (error) {
        console.log({
            name: error.name,
            msg: error.message
        })
    }
}

module.exports = {
    getLicenses,
    createLicenses
}