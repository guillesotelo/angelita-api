const dotenv = require('dotenv')
const express = require('express')
const router = express.Router()
const { Subscription, MailList } = require('../db/models')
const { sendContactEmail } = require('../helpers/mailer')
const { encrypt, decrypt } = require('../helpers')
const { REACT_APP_URL } = process.env
const jwt = require('jsonwebtoken')
dotenv.config()
const { JWT_SECRET } = process.env
const { verifyToken } = require('../helpers')

//New subscription
router.post('/subscribe', async (req, res, next) => {
    try {
        const emailRegistered = await Subscription.findOne({ email }).exec()
        if (emailRegistered) return res.status(401).send('Email already subscripted')

        const newSubscription = await Subscription.create(req.body)
        if (!newSubscription) return res.status(400).send('Bad request')
        
        await MailList.create(req.body)

        res.status(201).send(`Subscribed successfully`)
    } catch (err) {
        console.error('Something went wrong!', err)
        res.status(500).send('Server Error')
    }
})

//Send Contact Email
router.post('/sendContactEmail', async (req, res, next) => {
    try {
        await sendContactEmail('Angelita', req.body, 'guille.sotelo.cloud@gmail.com')
        await MailList.create(req.body)
        res.status(201).json({ message: 'ok' })
    } catch (err) {
        console.error('Something went wrong!', err)
        res.status(500).send('Server Error')
    }
})

//Cancel subscription
router.post('/cancelSubscription', async (req, res, next) => {
    try {
        const emailRegistered = await Subscription.findOne({ email }).exec()
        if (!emailRegistered) return res.status(401).send('Email not found')

        const canceled = await Subscription.findByIdAndUpdate(emailRegistered._id, { isActive: false }, { returnDocument: "after", useFindAndModify: false })
        if (!canceled) return res.status(400).send('Bad request')

        res.status(201).send(`Unsubscribed successfully`)
    } catch (err) {
        console.error('Something went wrong!', err)
        res.status(500).send('Server Error')
    }
})

module.exports = router