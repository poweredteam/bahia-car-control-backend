const {Schema, model} = require('mongoose');

const license = new Schema({
    license_plate: {
        type: String,
        required: true
    },
    /* services: {

    } */
/*     services: {
        type: Schema.Types.ObjectId,
        ref: 'Services',
        required: true
    }, */
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    }
})

module.exports = model('License', license)