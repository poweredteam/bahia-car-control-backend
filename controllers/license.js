const { getLicense, createLicense } = require('../services/licenses')


const getLicenses = async(req, res) => {
    try {
        res.status(200).send(await getLicense())
    } catch (error) {
        console.log(error)
    }
}

const createLicenses = async(req, res) => {
    const { license_plate, id } = req.body;
    console.log(req.body)
    try {
        //res.send("hola")
        res.json(await createLicense({license_plate, id}))
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