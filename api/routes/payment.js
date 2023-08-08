const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
const { Order, MailList } = require('../db/models')
const { sendPurchaseEmail, sendPurchaseCoachingEmail } = require('../helpers/mailer')
dotenv.config()
const {
    REACT_APP_STRIPE_SECRET,
    REACT_APP_STRIPE_PUBLIC
} = process.env
const stripe = require("stripe")(REACT_APP_STRIPE_SECRET)

router.post('/create-checkout-session', async (req, res, next) => {
    try {
        const { items, locale } = req.body
        const { rawData } = items[0]
        const order = await Order.create({ ...items[0], ...rawData })

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
            success_url: `${process.env.REACT_APP_URL}/successPayment?orderId=${order._id}`,
            cancel_url: `${process.env.REACT_APP_URL}/checkout`,
        })

        if (order && session && session.url) return res.json({ url: session.url })

        res.json({ url: 'https://angelita.vercel.app/checkoutError' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message })
    }
})

router.post('/confirmPayment', async (req, res, next) => {
    try {
        const { _id } = req.body
        const order = await Order.find({ _id })

        if (order && !order.isPaid) {
            await Order.findByIdAndUpdate(_id, { isPaid: true }, { returnDocument: "after", useFindAndModify: false })
            if (!order) res.status(404).json({ error: 'Error updating order' })

            await MailList.create(order)

            if (order.isEvent) {
                const event = await Event.find({ serviceId: order.serviceId })
                if (event) {
                    await Event.findByIdAndUpdate(event._id,
                        { participants: event.participants + 1 },
                        { returnDocument: "after", useFindAndModify: false })
                }
            }
            const { username, email, name } = order
            if (name === 'Coaching') await sendPurchaseCoachingEmail(username, order, email)
            else await sendPurchaseEmail(username, order, email)
        }

        res.json(order)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message })
    }
})


router.get('/getPublicKey', (req, res) => {
    res.json({
        key: REACT_APP_STRIPE_PUBLIC
    })
})

module.exports = router
