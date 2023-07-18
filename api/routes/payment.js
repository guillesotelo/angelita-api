const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
dotenv.config()
const {
    REACT_APP_STRIPE_SECRET,
    REACT_APP_STRIPE_PUBLIC
} = process.env
const stripe = require("stripe")(REACT_APP_STRIPE_SECRET)

router.post('/create-checkout-session', async (req, res, next) => {
    try {
        const { items } = req.body
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: items.map(item => {
                const { name, priceInCents, quantity } = item
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name,
                        },
                        unit_amount: priceInCents,
                    },
                    quantity,
                }
            }),
            success_url: `${process.env.REACT_APP_URL}/successPayment`,
            cancel_url: `${process.env.REACT_APP_URL}/checkout`,
        })
        res.json({ url: session.url })
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: e.message })
    }
})

router.get('/getPublicKey', (req, res) => {
    res.json({
        key: REACT_APP_STRIPE_PUBLIC
    })
})

module.exports = router
