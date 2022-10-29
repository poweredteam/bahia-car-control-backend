const { Schema, model } = require('mongoose');

const techSchema = Schema({
    name: {
        type: String,
        required: true
    },
    bay: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('Tech', techSchema);