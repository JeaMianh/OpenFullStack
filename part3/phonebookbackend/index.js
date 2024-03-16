const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

morgan.token('content', (request, response) => {
  return JSON.stringify(request.body) || '-'
})

app.use(morgan(':method :url :status :content'))


let persons = [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
]
app.get('/info', (request, response) => {
    let date = new Date()
    response.send(
        `<p>Phonebook has info for ${persons.length} people</p>` +
        `<p>${date}</p>`
        )
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({error: 'content missing'})
    // 400 客户端错误
  }

  const name = body.name
  const isDuplicate = persons.some(person => person.name === name) 
  if (isDuplicate) {
    return response.status(400).json({error: 'name must be unique'})
  }

  const generateID = () => {
    return Math.random() * 1000
  }

  const person = {
    id: generateID(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)

  response.json(person)
})


app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
  // 204 无内容，成功
})

const PORT = 3001
app.listen(PORT)
console.log(`Server is running on port ${PORT}`)