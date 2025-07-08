const express = require('express')
const router = express.Router()
const { PsiService } = require('../db/models')
const { verifyToken } = require('../helpers')

 const SERVICES = [
    {
        title: 'PRIMERA CONSULTA DE 90 MINUTOS',
        slug: 'primera-consulta-de-90-minutos',
        subtitle: '',
        description: `
        €30`,

        priceCOP: '90000',
        priceEUR: '30',
        paymentLink: '',
        type: 'privada',
        image: '',
        active: true,
        buy_button_id: "buy_btn_1RayekHIxmqjxScpOD0KUCqL",
    },

    {
        title: 'CONSULTA INDIVIDUAL',
        slug: 'consulta-individual',
        subtitle: '',
        description: `
        €40 x 1 hora
        \n
        €60 x 2 horas`,

        priceCOP: '130000',
        priceCOP2: '100000',
        priceEUR: '40',
        priceEUR2: '60',
        paymentLink: '',
        type: 'privada',
        image: '',
        active: true,
        buy_button_id: "buy_btn_1Raz5NHIxmqjxScpk3QOzo4C",
    },

    {
        title: 'PAQUETE DE 4 SESIONES (Semanales y consecutivas)',
        slug: 'paquete-de-4-sesiones',
        subtitle: '',
        description: `
        €120 x 4 horas`,

        priceCOP: '400000',
        priceEUR: '120',
        paymentLink: '',
        type: 'privada',
        image: '',
        active: true,
        buy_button_id: "buy_btn_1Raz6IHIxmqjxScpgmbVo1Wh",
    },


    {
        title: 'GRUPO DE APOYO PSICOTERAPÉUTICO (4 sesiones, semanales y consecutivas. Jueves 18:00 horas de España)',
        slug: 'grupo-de-apoyo-psicoterapeutico',
        subtitle: '',
        description: `
        €40`,

        priceCOP: '200000',
        priceEUR: '40',
        paymentLink: '',
        type: 'grupal',
        image: '',
        active: true,
        buy_button_id: "buy_btn_1Raz7CHIxmqjxScpYRMEcOpH",
    },

    {
        title: 'GRUPO DE APOYO ESPIRITUAL (Sesiones semanales, sin continuidad fija)',
        slug: 'grupo-de-apoyo-espiritual',
        subtitle: '',
        description: `
        $ Aporte Voluntario`,

        priceCOP: '0',
        priceEUR: '0',
        paymentLink: '',
        type: 'grupal',
        image: '',
        active: true,
        buy_button_id: "buy_btn_1RazAYHIxmqjxScpdVr9Ynou",
    },

    {
        title: 'CHARLAS & ENCUENTROS FORMATIVOS (Online o presenciales. 4 horas)',
        slug: 'charlas-y-encuentros-formativos',
        subtitle: '',
        description: `
        €200
        \n
        (Valor de Transporte y Alojamiento en caso de ser presencial no está incluido)`,
        priceCOP: '1000000',
        priceEUR: '200',
        paymentLink: '',
        type: 'grupal',
        image: '',
        active: true,
        buy_button_id: "buy_btn_1RazBKHIxmqjxScpmmuF6Fp3",
    },
]
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
        if (!service) return res.status(404).send('Post not found.')

        res.status(200).json(service)
    } catch (err) {
        console.error('Something went wrong!', err)
        res.send(500).send('Server Error')
    }
})

//Create bulk
router.get('/createBulk', async (req, res, next) => {
    try {
        const arr = await Promise.all(SERVICES.map(async s => await PsiService.create(s)))

        res.status(200).json(arr)
    } catch (err) {
        console.error('Something went wrong!', err)
        res.send(500).send('Server Error')
    }
})

//Create new service
router.post('/create', verifyToken, async (req, res, next) => {
    try {
        const newservice = await PsiService.create(req.body)
        if (!newservice) return res.status(400).json('Error creating post')

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