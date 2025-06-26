const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    serviceId: {
        type: String
    },
    title: {
        type: String
    },
    name: {
        type: String
    },
    lastName: {
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
    username: {
        type: String
    },
    email: {
        type: String
    },
    country: {
        type: String
    },
    phone: {
        type: String
    },
    age: {
        type: Number
    },
    quantity: {
        type: Number
    },
    realQty: {
        type: Number
    },
    realPrice: {
        type: String
    },
    priceInCents: {
        type: Number
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
    selectedTime: {
        type: String
    },
    isPaid: {
        type: Boolean,
        default: false
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
    eventId: {
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

const Order = mongoose.model('Order', orderSchema)

module.exports = Order