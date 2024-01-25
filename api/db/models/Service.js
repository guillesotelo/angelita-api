const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    currency: {
        type: String,
        default: 'usd'
    },
    discount: {
        type: String
    },
    type: {
        type: String
    },
    duration: {
        type: Number
    },
    mark: {
        type: String
    },
    day: {
        type: String
    },
    time: {
        type: String
    },
    image: {
        type: String
    },
    imageUrl: {
        type: String
    },
    description: {
        type: String
    },
    date: {
        type: String
    },
    dateObject: {
        type: String
    },
    dateObjects: {
        type: String
    },
    fixedTime: {
        type: Boolean
    },
    startTime: {
        type: Number
    },
    endTime: {
        type: Number
    },
    isEvent: {
        type: Boolean
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

const Service = mongoose.model('Service', serviceSchema)

module.exports = Service