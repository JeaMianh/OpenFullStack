require('dotenv').config()

const Note = require('./models/note')

const cors = require('cors')
const express = require('express') // 创建一个 express 应用
const app = express() // 存储在 app 变量中

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

// get 的第一个参数定义了路径
// 定义一个路由
app.get('/api/notes', (request, response) => {
  // Note 是一个 Mongoose 模型
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

// 冒号语法，用于定义参数
app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = new Note({
    content: body.content,
    important:body.important || false,
  }) 
  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)