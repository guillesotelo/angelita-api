const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    title: {
        type: String
    },
    subtitle: {
        type: String
    },
    participants: {
        type: Number
    },
    link: {
        type: String
    },
    password: {
        type: String
    },
    type: {
        type: String
    },
    tags: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    iamge: {
        type: String
    },
    iamgeUrl: {
        type: String
    },
    data: {
        type: String
    },
}, { timestamps: true })

const Event = mongoose.model('Event', eventSchema)

module.exports = Event