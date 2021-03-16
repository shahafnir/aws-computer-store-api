const express = require('express')
const router = new express.Router()
const Computer = require('../models/computer')

router.post('/computers', async (req, res) => {
    try {
        const computer = await Computer.create(req.body)

        res.status(201).send(computer)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/computers', async (req, res) => {
    try {
        const computers = await Computer.findAll()

        res.send(computers)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router
