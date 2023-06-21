const express = require('express')
const router = express.Router()
const { verifyToken } = require('../helpers')

const userRoutes = require('./user')
const appRoutes = require('./app')
const paymentRoutes = require('./payment')

router.use('/user', userRoutes)
router.use('/app', appRoutes)
router.use('/payment', paymentRoutes)

module.exports = router, verifyToken