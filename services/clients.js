const Client = require("../models/Client");
const License = require("../models/License");
const { PLATE_CREATED } = require("../constans");

const getClient = async () => {
    const clientFounded = await Client.find()
    return {
        status: "ClientFounded",
        msg: clientFounded
    }
}

const createClient = async (client) => {
    const arrClean = Array.from(new Set([...client.license_plates])) //sacar repetidos
    client.license_plates = arrClean //modifico el obj
    await Promise.all(arrClean.map(async(c,i) => {
        //console.log({plate: c,index: i})
        const licenseFound = await License.findOne({ license_plate: c }) //busca la placa
        //console.log("licenseFound",licenseFound)
        if (!licenseFound) await License.create({ license_plate: c }) //si no la encuentra la crea
    }))
    const clientCreated = await Client.create(client) //creo cliente
    return {
        status: "Clientcreated",
        msg: clientCreated
    }
}

const clientLicense = async (idClient, license) => {
    const licenseFounded = await License.findOne({ license_plate: license }) //busco si existe la placa
    const clientToUpdate = await Client.findOne({identification: idClient}) //traigo el cliente a actualizar
    if(!licenseFounded) {
        await License.create({ license_plate: license})
        await Client.findByIdAndUpdate(clientToUpdate, {license_plates: [...clientToUpdate.license_plates, license]}) //si la placa no existe, actualizo
    }
    return {
        status: "ClientLicenseRelated",
        msg: PLATE_CREATED
    }
}

module.exports = {
    getClient,
    createClient,
    clientLicense
}