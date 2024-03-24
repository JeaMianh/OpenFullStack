const config = require('./utils/config')
const express = require('express')
const app = express()
import cors from 'cors';
import mongoose from 'mongoose';
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

mongoose.set("strictQuery", false);

logger.info('connecting to', config.MONGODB_URI)

const mongoUrl = config.MONGODB_URI
// console.log('mongoUrl:', mongoUrl)
mongoose.connect(mongoUrl??'')
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error: Error) => {
        console.log('Error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app