const {Schema, model} = require('mongoose');

const products = new Schema({
    product : {
        type : String,
        required : true
    },
    brand : {
        type :  String,
        required : true
    },
    partnumber : {
        type : String,
        required : true,
        unique: true
    }
})

module.exports = model('Products', products)