const express = require('express')
const router = new express.Router()
const Computer = require('../models/computer')
const Sequelize = require('sequelize')

router.post('/computers', async (req, res) => {
    try {
        const computer = await Computer.create(req.body)

        res.status(201).send(computer)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/computers', async (req, res) => {
    const queryOptions = [
        'manufacturer',
        'model',
        'cpu',
        'ram',
        'disk',
        'price',
    ]

    const match = {}

    const { gt, lte } = Sequelize.Op

    queryOptions.forEach((option) => {
        if (req.body[option]) {
            if (option === 'ram' || option === 'disk' || option === 'price') {
                match[option] = {
                    [gt]: req.body[option]['gt'],
                    [lte]: req.body[option]['lte'],
                }
            } else {
                match[option] = req.body[option]
            }
        }
    })

    try {
        const computers = await Computer.findAll({
            where: {
                ...match,
            },
        })

        res.send(computers)
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/', async (req, res) => {
    res.redirect('computers')
})

module.exports = router
