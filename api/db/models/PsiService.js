const mongoose = require('mongoose')

const psiServiceSchema = new mongoose.Schema({
    title: {
        type: String
    },
    slug: {
        type: String
    },
    subtitle: {
        type: String
    },
    description: {
        type: String
    },
    priceEUR: {
        type: String
    },
    discounts: {
        type: String
    },
    discountsApply: {
        type: String
    },
    amountPayed: {
        type: String
    },
    paymentLink: {
        type: String
    },
    type: {
        type: String
    },
    image: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    },
    buy_button_id: {
        type: String
    },
    removed: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

const PsiService = mongoose.model('PsiService', psiServiceSchema)

module.exports = PsiService