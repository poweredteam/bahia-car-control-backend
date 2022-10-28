const {createServices, getAllServices, getAllServiceByVehicle_id, modifyService, deleteServices} = require('../services/services')
const Services = require('../models/Service')
const {ERROR} = require('.././constans')

const createService = async(req, res) =>{
    try {
        res.status(200).json(await createServices(req.body))    
    } catch (error) {
        console.log({
            name : error.name,
            msg : error.message
        })
        res.status(400).json({msg : ERROR })
    }
}

const getAllService = async(req, res) =>{
    try {
        res.status(200).json(await getAllServices())    
    } catch (error) {
        console.log({
            name : error.name,
            msg : error.message
        })
        res.status(400).json({msg : ERROR })
    }
}

const getOneServiceByVehicle_id = async(req, res) =>{
    const {vehicle_id} = req.query
    try {
        res.status(200).json(await getAllServiceByVehicle_id(vehicle_id))    
    } catch (error) {
        console.log({
            name : error.name,
            msg : error.message
        })
        res.status(400).json({msg : ERROR })
    }
}

const modifyServices = async(req, res) =>{
    const {id} = req.query
    try {
        res.status(200).json(await modifyService(id, req.body))    
    } catch (error) {
        console.log({
            name : error.name,
            msg : error.message,
            path : 'controller'
        })
        res.status(400).json({msg : ERROR })
    }
}

const deleteService = async(req, res) =>{
    try {
        return res.status(200).json(await deleteServices(req.id))
    } catch (error) {
        console.log({
            name : error.name,
            msg : error.message,
            path : 'controller'
        })
        res.status(400).json({msg : ERROR })
    }
}

module.exports = {createService, getAllService, getOneServiceByVehicle_id, modifyServices, deleteService}