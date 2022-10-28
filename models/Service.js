const {Schema, model} = require('mongoose');

const services  = new Schema({
    type :{
        type : String,
        require: true
    },
    cronometer :{
        type : String,
        requires: true
    },
    datetime : {
        type : String,
        require: true
    },
    workstation : {
        type : Number,
        require : true
    },
    technician : {
        type : String,
        require : true
    },
    driver : {
        type : String,
        require: false
    },
    kilometers : {
        type : Number,
        require: true
    },
    goods : {
        type : String,
        require: true
    },
    vehicle_id : {
        type : String,
        require: true
    },
    comments : {
        type : String,
        require : false,    
    }
})

module.exports = model('Services', services)