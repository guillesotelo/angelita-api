const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
const { Order } = require('../db/models')
const { sendBookingUpdateEmail } = require('../helpers/mailer')

//Get all bookings
router.get('/getAll', async (req, res, next) => {
    try {
        const bookings = await Order.find({
            $or: [
                { removed: false },
                { removed: { $exists: false } }
            ]
        }).sort({ createdAt: -1 })
        if (!bookings) return res.status(404).send('No bookings found.')

        res.status(200).json(bookings)
    } catch (err) {
        console.error('Something went wrong!', err)
        res.send(500).send('Server Error')
    }
})

//Get booking by ID
router.get('/getById', async (req, res, next) => {
    try {
        const { _id } = req.query
        const booking = await Order.findById(_id)
        if (!booking) return res.status(404).send('Post not found.')

        res.status(200).json(booking)
    } catch (err) {
        console.error('Something went wrong!', err)
        res.send(500).send('Server Error')
    }
})

//Create new booking
router.post('/create', async (req, res, next) => {
    try {
        const newBooking = await Order.create(req.body)
        if (!newBooking) return res.status(400).json('Error creating post')

        res.status(200).json(newBooking)
    } catch (err) {
        console.error('Something went wrong!', err)
        res.send(500).send('Server Error')
    }
})

//Update booking Data
router.post('/update', async (req, res, next) => {
    try {
        const { _id } = req.body
        let bookingData = { ...req.body }

        const updated = await Order.findByIdAndUpdate(_id, bookingData, { returnDocument: "after", useFindAndModify: false })
        if (!updated) return res.status(404).send('Error updating Order.')

        const { username, email } = updated
        await sendBookingUpdateEmail(username, updated, email)

        res.status(200).json(updated)
    } catch (err) {
        console.error('Something went wrong!', err)
        res.send(500).send('Server Error')
    }
})

//Update booking Data
router.post('/remove', async (req, res, next) => {
    try {
        const { _id } = req.body

        const deleted = await Order.findByIdAndUpdate(_id, { removed: true }, { returnDocument: "after", useFindAndModify: false })

        res.status(200).json(deleted)
    } catch (err) {
        console.error('Something went wrong!', err)
        res.send(500).send('Server Error')
    }
})


module.exports = router