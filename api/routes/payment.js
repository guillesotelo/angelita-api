const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
const { Order } = require('../db/models')
const {
    transporter,
    sendWelcomeEmail,
    sendPurchaseEmail
} = require('../helpers/mailer')
dotenv.config()
const {
    REACT_APP_STRIPE_SECRET,
    REACT_APP_STRIPE_PUBLIC
} = process.env
const stripe = require("stripe")(REACT_APP_STRIPE_SECRET)

router.post('/create-checkout-session', async (req, res, next) => {
    try {
        const { items, locale } = req.body
        const session = await stripe.checkout.sessions.create({
            locale,
            payment_method_types: ["card"],
            mode: "payment",
            line_items: items.map(item => {
                const {
                    name,
                    priceInCents,
                    quantity,
                    image,
                    description
                } = item
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name,
                            description,
                            images: [image],
                            // metadata: { ...item }
                        },
                        unit_amount: priceInCents,
                    },
                    quantity,
                }
            }),
            success_url: `${process.env.REACT_APP_URL}/successPayment`,
            cancel_url: `${process.env.REACT_APP_URL}/checkout`,
        })

        if (session && session.url) {
            const { rawData } = items[0]
            const order = await Order.create({ ...items[0], ...rawData })
            // sendEmailOrderReceived
            // const email = await sendPurchaseEmail(items[0].username, { ...items[0], rawData }, items[0].email)
            if (order && email) res.json({ url: session.url })
            res.json({ url: 'https://angelita.vercel.app/checkoutError' })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: e.message })
    }
})

router.get('/getPublicKey', (req, res) => {
    res.json({
        key: REACT_APP_STRIPE_PUBLIC
    })
})

module.exports = router
