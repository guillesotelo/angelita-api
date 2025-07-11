const express = require('express')
const router = express.Router()
const { PsiService } = require('../db/models')
const { verifyToken } = require('../helpers')

//Get all services
router.get('/getAll', async (req, res, next) => {
    try {
        const services = await PsiService.find({
            $or: [
                { removed: false },
                { removed: { $exists: false } }
            ]
        }).sort({ createdAt: -1 })
        if (!services) return res.status(404).send('No services found.')

        res.status(200).json(services)
    } catch (err) {
        console.error('Something went wrong!', err)
        res.send(500).send('Server Error')
    }
})

//Get service by ID
router.get('/getById', async (req, res, next) => {
    try {
        const { _id } = req.query
        const service = await PsiService.findById(_id)
        if (!service) return res.status(404).send('Service not found.')

        res.status(200).json(service)
    } catch (err) {
        console.error('Something went wrong!', err)
        res.send(500).send('Server Error')
    }
})

//Get service by slug
router.get('/getBySlug', async (req, res, next) => {
    try {
        const { slug } = req.query
        const service = await PsiService.findOne({ slug })
        if (!service) return res.status(404).send('Service not found.')

        res.status(200).json(service)
    } catch (err) {
        console.error('Something went wrong!', err)
        res.send(500).send('Server Error')
    }
})

//Create new service
router.post('/create', verifyToken, async (req, res, next) => {
    try {
        const newservice = await PsiService.create(req.body)
        if (!newservice) return res.status(400).json('Error creating service')

        res.status(200).json(newservice)
    } catch (err) {
        console.error('Something went wrong!', err)
        res.send(500).send('Server Error')
    }
})

//Update service Data
router.post('/update', verifyToken, async (req, res, next) => {
    try {
        const { _id } = req.body
        let serviceData = { ...req.body }

        const updated = await PsiService.findByIdAndUpdate(_id, serviceData, { returnDocument: "after", useFindAndModify: false })
        if (!updated) return res.status(404).send('Error updating PsiService.')

        res.status(200).json(updated)
    } catch (err) {
        console.error('Something went wrong!', err)
        res.send(500).send('Server Error')
    }
})

//Update service Data
router.post('/remove', verifyToken, async (req, res, next) => {
    try {
        const { _id } = req.body

        const deleted = await PsiService.findByIdAndUpdate(_id, { removed: true }, { returnDocument: "after", useFindAndModify: false })

        res.status(200).json(deleted)
    } catch (err) {
        console.error('Something went wrong!', err)
        res.send(500).send('Server Error')
    }
})


module.exports = router