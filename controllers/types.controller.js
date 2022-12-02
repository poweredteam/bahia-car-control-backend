const { getTypes, createTypes, modifyTypes, deleteTypes } = require('../services/types')
const {ERROR} = require('../constans')

const getType = async(req, res) =>{
    try {
        res.status(200).json(await getTypes())
    } catch (error) {
        console.log({
            name: error.name,
            msg: error.message
        })
        res.status(400).json({
            msg: ERROR,
            path: 'controller'
        })
    }
}

const createType = async(req, res) =>{
    try {
        res.status(201).json(await createTypes(req.body))
    } catch (error) {
        console.log({
            name: error.name,
            msg: error.message
        })
        res.status(400).json({
            msg: ERROR,
            path: 'controller'
        })
    }
}

const modifyType = async(req, res) =>{
    const {id} = req.query
    const {newData} = req.body
    console.log(id,newData)
    try {
        res.status(200).json(await modifyTypes(id, {type: newData}))
    } catch (error) {
        console.log({
            name: error.name,
            msg: error.message
        })
        res.status(400).json({
            msg: ERROR,
            path: 'controller'
        })
    }
}

const deleteType = async(req, res) =>{
    const {id} = req.query
    try {
        res.status(200).send(await deleteTypes({_id: id}))
    } catch (error) {
        console.log({
            name: error.name,
            msg: error.message
        })
        res.status(400).json({
            msg: ERROR,
            path: 'controller'
        })
    }
}

module.exports =  { getType, createType, modifyType, deleteType }  