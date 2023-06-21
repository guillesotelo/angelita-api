const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
dotenv.config()
const {
    REACT_APP_STRIPE_SECRET,
    REACT_APP_STRIPE_PUBLIC
} = process.env
const stripe = require("stripe")(REACT_APP_STRIPE_SECRET)

// Test payment
router.post('/createPayment', async (req, res, next) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            currency: "EUR",
            amount: 1999,
            automatic_payment_methods: { enabled: true },
        })

        // Send publishable key and PaymentIntent details to client
        res.json({
            secret: paymentIntent.client_secret,
        })
    } catch (e) {
        return res.status(400).send({
            error: {
                message: e.message,
            },
        })
    }
})

router.get('/getPublicKey', (req, res) => {
    res.json({
        key: REACT_APP_STRIPE_PUBLIC
    })
})

module.exports = router
