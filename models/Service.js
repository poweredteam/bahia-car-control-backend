const {Schema, model} = require('mongoose');

const services  = new Schema({
    type :{
        type : String,
        required: true
    },
    cronometer :{
        type : String,
        required: true
    },
    datetime : {
        type : String,
        required: true
    },
    workstation : {
        type : Number,
        required : true
    },
    technician : {
        type : String,
        required : true
    },
    driver : {
        type : String,
        required: false
    },
    kilometers : {
        type : Number,
        required: true
    },
    goods : {
        type : String,
        required: true
    },
    vehicle_id : {
        type : String,
        required: true
    },
    comments : {
        type : String,
        required : false,    
    }
})

module.exports = model('Services', services)