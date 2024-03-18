const notesRouter = require('express').Router()
const Note = require('../models/note')

// notesRouter.use(express.json())
// notesRouter.use(express.static('build'))
// notesRouter.use(cors())


// get 的第一个参数定义了路径
// 定义一个路由
notesRouter.get('/', (request, response,) => {
  // Note 是一个 Mongoose 模型
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

// 冒号语法，用于定义参数
notesRouter.get('/:id', (request, response, next) => {
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

notesRouter.post('/', (request, response, next) => {
  const body = request.body

  // if (!body.content) {
  //   return response.status(400).json({
  //     error: 'content missing'
  //   })
  // }
  // 添加了Mongoode提供的内置验证器，转到错误中间件的 validationError 处理错误

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

notesRouter.put('/:id', (request, response, next) => {
  const { content, important } = request.body
  Note.findByIdAndUpdate(
      request.params.id, 
      {content, important}, 
      {new: true, runValidators: true, context: 'query'}
    )
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})



notesRouter.delete('/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// const errorHandler = (error, request, response, next) => {
//   console.error(error.message)

//   if (error.name === 'CastError') {
//     return response.status(400).send({error: 'malformatted id'})
//   } else if (error.name === 'ValidationError') {
//     return response.stetus(400).json({error: error.message})
//   }

//   next(error)
// }

// notesRouter.use(errorHandler)
module.exports = notesRouter

