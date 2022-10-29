const Client = require("../models/Client");

const getClient = async() => {
    const clientFounded = await Client.find()
    return {
        status: "Clientcreated",
        msg: clientFounded
    }
}

const createdClient = async(client) => {
    const clientCreated = await Client.create(client)
    return {
        status: "Clientcreated",
        msg: clientCreated
    }
}

module.exports = {
    getClient,
    createdClient
}