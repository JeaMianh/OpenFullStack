const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

const jwt = require('jsonwebtoken')

// notesRouter.use(express.json())
// notesRouter.use(express.static('build'))
// notesRouter.use(cors())


// get 的第一个参数定义了路径
// 定义一个路由
notesRouter.get('/', async (request, response,) => {
  const notes = await Note.find({}).populate('user', {username: 1, name: 1})
  // Note 是一个 Mongoose 模型
  response.json(notes)
  // Note.find({}).then(notes => {
  //   response.json(notes)
  // })
})

// 冒号语法，用于定义参数
notesRouter.get('/:id', async (request, response, next) => {
  const note = await Note.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(400).end()
  }
  // Note.findById(request.params.id)
  //   .then(note => {
  //     if (note) {
  //       response.json(note)
  //     } else {
  //       response.status(404).end()
  //     }
  //   })
  //   .catch(error => { // 如果 findById 返回的 promise 被拒绝，会抛出异常
  //     next(error) // 将控制权交给错误处理中间件
  //   })
})

// 将 token 从 authorization 中分离出来
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

notesRouter.post('/', (request, response, next) => {
  const body = request.body
// jwt.verify() 检查 token 有效性，并解码，返回 token 基于的对象，包括 username 和 id
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  User.findById(decodedToken.id)
    .then(user => {
        const note = new Note({
          content: body.content,
          important:body.important || false,
          user: user.id
        }) 

        note.save()
          .then(savedNote => {
            user.notes = user.notes.concat(savedNote._id)
            user.save()
            response.status(201).json(savedNote)
          })
          .catch(error => next(error))
    })

  // if (!body.content) {
  //   return response.status(400).json({
  //     error: 'content missing's
  //   })
  // }
  // 添加了Mongoode提供的内置验证器，转到错误中间件的 validationError 处理错误

 

  
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

