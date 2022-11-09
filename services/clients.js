const Client = require("../models/Client");
const License = require("../models/License");
const { PLATE_CREATED, PLATE_RELATED } = require("../constans");
const { infoLicense } = require("../helpers/infoLicense");

const getClient = async () => {
    const clientFound = await Client.find()
    return {
        status: "ClientFounded",
        msg: clientFound
    }
}

const getClientByIdAndLicense = async (idClient, license) => {
    const clientFound = await Client.findOne({ identification: idClient })
    const licenseFound = await License.findOne({ license_plate: license })
    //crear cliente y licencia
    //flor debe habilitar modal creacion de clientes (incluye placa), ejecuta createClient()  
    if (!clientFound && !licenseFound) {
        return {
            client: {
                status: false,
                body: {}
            },
            license: {
                status: false,
                isRelated: false,
                body: {}
            },
        }
    }
    //crear licencia
    //habilitar modal de creacion de licencia, ejecuta RelatedLicenseClient()
    if (clientFound && !licenseFound) {
        return {
            client: {
                status: true,
                body: clientFound
            },
            license: {
                status: false,
                isRelated: false,
                body: {}
            }
        }
    }
    //todo ok, crea servicio
    if (clientFound && clientFound.license_plates.find(l => l === license)) {
        return {
            client: {
                status: true,
                body: clientFound
            },
            license: {
                status: true,
                isRelated: true,
                body: licenseFound
            }
        }
    }
    //cliente y licencia existe pero no hay relacion, ejecuta RelatedLicenseClient()
    const licensePlateRelated = clientFound.license_plates.find(l => l === license)
    if (clientFound && licenseFound && !licensePlateRelated) {
        return {
            client: {
                status: true,
                body: clientFound
            },
            license: {
                status: true,
                isRelated: false,
                body: licenseFound
            }
        }
    }
}

const createClient = async (client) => {
    const arrClean = Array.from(new Set([...client.license_plates])) //sacar repetidos
    client.license_plates = arrClean //modifico el obj
    await Promise.all(arrClean.map(async (c, i) => {
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

const RelatedLicenseClient = async (idClient, license) => {
    const licenseFounded = await License.findOne({ license_plate: license }) //busco si existe la placa
    const clientToUpdate = await Client.findOne({ identification: idClient }) //traigo el cliente a actualizar
    if (!clientToUpdate) {
        return {
            status: false,
            msg: "Client not found"
        }
    }
    if (!licenseFounded) {
        await License.create({ license_plate: license })
        await Client.findByIdAndUpdate(clientToUpdate, { license_plates: [...clientToUpdate.license_plates, license] }) //si la placa no existe, actualizo
        return {
            status: "License created and related",
            msg: PLATE_CREATED
        }
    }
    else {
        await Client.findByIdAndUpdate(clientToUpdate, { license_plates: [...clientToUpdate.license_plates, license] })
    }
    return {
        status: "License related",
        msg: PLATE_RELATED
    }
}

const deleteClient = async (idClient) => {
    if(await infoLicense(idClient)) {
        return {
            status: "Error",
            msg: "Ya tiene servicios asociados"
        }
    }
    const clientToDelete = await Client.findOne({ identification: idClient })
    const arrLicensesClient = clientToDelete.license_plates
    await Promise.all(arrLicensesClient.map(async c => {
        await License.deleteOne({ license_plate: c }) //elimina cada placa del arr de licencias
    }))
    await Client.deleteOne({ identification: idClient })
    return {
        status: "Client deleted",
        msg: clientToDelete
    }
}

module.exports = {
    getClient,
    createClient,
    RelatedLicenseClient,
    getClientByIdAndLicense,
    deleteClient,
    infoLicense
}