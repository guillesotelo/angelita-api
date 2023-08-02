const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    name: {
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
        type: Boolean,
        default: true
    },
    isEvent: {
        type: Boolean,
        default: true
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