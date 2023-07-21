const express = require('express')
const router = express.Router()
const { verifyToken } = require('../helpers')

const userRoutes = require('./user')
const appRoutes = require('./app')
const paymentRoutes = require('./payment')
const bookingRoutes = require('./booking')

router.use('/user', userRoutes)
router.use('/app', appRoutes)
router.use('/payment', paymentRoutes)
router.use('/booking', bookingRoutes)

module.exports = router, verifyToken