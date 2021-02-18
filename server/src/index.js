require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const {port, dbHost, dbPort, dbName} = require('./config')
const MyError = require('./utils/myError')
const userRoutes = require('./routes/userRoutes')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/api/users', userRoutes)

app.use('*', (req, res, next) => {
    const error = new MyError(404, 'Not found')
    next(error)
})

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message,
        stack: err.stack
    })
})

const init = async () => {
    try {
        await mongoose.connect(
            `mongodb://${dbHost}:${dbPort}/${dbName}`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            }
        )
        console.log('Database connected')
        app.listen(port, () => console.log(`Server listening on port: ${port}`))
    } catch (error) {
        console.log(error)
        process.exit(0)
    }
}

init()