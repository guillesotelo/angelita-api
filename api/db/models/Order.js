const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    currency: {
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
    description: {
        type: String
    },
    date: {
        type: String
    },
}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema)

module.exports = Order