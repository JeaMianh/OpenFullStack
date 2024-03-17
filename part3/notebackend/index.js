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
app.get('/api/notes', (request, response,) => {
  // Note 是一个 Mongoose 模型
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

// 冒号语法，用于定义参数
app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => { // 如果 findById 返回的 promise 被拒绝，会抛出异常
      next(error) // 将控制权交给错误处理中间件
    })
})

app.post('/api/notes', (request, response, next) => {
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
  note.save()
    .then(savedNote => {
      response.json(savedNote)
    })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body
  const note = {
    content: body.content,
    important: body.important,
  }
  Note.findByIdAndUpdate(request.params.id, note, {new: true})
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})



app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)



