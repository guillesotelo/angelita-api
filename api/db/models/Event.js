const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    name: {
        type: String
    },
    service: {
        type: String
    },
    serviceId: {
        type: String
    },
    price: {
        type: Number
    },
    currency: {
        type: String
    },
    discount: {
        type: String
    },
    imageUrl: {
        type: String
    },
    description: {
        type: String
    },
    dateObject: {
        type: String
    },
    isVirtual: {
        type: Boolean,
        default: true
    },
    link: {
        type: String
    },
    linkPassword: {
        type: String
    },
    otherData: {
        type: String
    },
    removed: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

const Event = mongoose.model('Event', eventSchema)

module.exports = Event