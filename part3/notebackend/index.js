// require('dotenv').config()

// const Note = require('./models/note')

// const cors = require('cors')
// const express = require('express') // 创建一个 express 应用
// const app = express() // 存储在 app 变量中
const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {  
  logger.info(`Server running on port ${config.PORT}`)
})

// const PORT = process.env.PORT
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)



