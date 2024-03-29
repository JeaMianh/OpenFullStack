const bcrypt = require('bcrypt')
// 创建一个新的路由器对象。 Router() 是一个构造方法
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
  // 替换 user 的 notes 字段，指向 note 文档
  const users = await User.find({}).populate('notes')
  response.json(users)
})

userRouter.post('/', async (request, response) => {
    const { username, name, password } =  request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = userRouter