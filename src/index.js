const express = require('express')
const cors = require('cors')

const port = process.env.PORT
const sequelize = require('./db/sequelize')
const computerRouter = require('./routers/computer')

const app = express()

app.use(express.json())
app.use(cors())
app.use(computerRouter)

sequelize
    .sync()
    .then(() => {
        app.listen(port, () => {
            console.log('Server is up on port: ' + port)
        })
    })
    .catch((err) => console.log(err))
