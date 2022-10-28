const Services = require('../models/Service')

const createServices = async (data) => {
    const service = await Services.create(data)
    return service
}

const getAllServices = async () =>{
    const allServices = await Services.find()
    return allServices
}

const getAllServiceByVehicle_id = async (data) =>{
    const oneService = await Services.findOne({vehicle_id : data})
    return oneService
}

const modifyService = async (id, data) => {
    await Services.findOneAndUpdate({id : id}, data)
    const modifyService = await Services.findOne({id : id})
    return modifyService
}
const deleteServices = async (id) => {
    const deletedServices =await Services.deleteOne({id: id})
    return deletedServices
}

module.exports = {
    createServices,
    getAllServices,
    getAllServiceByVehicle_id,
    modifyService,
    deleteServices
}