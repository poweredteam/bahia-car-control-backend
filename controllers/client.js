const { ERROR } = require("../constans")
const { createdClient } = require("../services/clients")



const getClients = async(req, res) => {
    try {
        res.status(200).send("clients")
    } catch (error) {
        console.log({
            name: error.name,
            msg: error.message
        })
        res.status(400).send(ERROR)
    }
}

const createClient = async(req, res) => {
    const { identification, name, lastName, phone, email } = req.body
    try {
        res.status(200).send(await createdClient({identification, name, lastName, phone, email}))
    } catch (error) {
        console.log({
            name: error.name,
            msg: error.message
        })
        res.status(400).send(ERROR)
    }
}

module.exports = {
    getClients,
    createClient
}