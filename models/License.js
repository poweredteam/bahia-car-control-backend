const {Schema, model} = require('mongoose');

const license = new Schema({
    license_plate: {
        type: String,
        unique: true,
        required: true
    }
})

module.exports = model('License', license)