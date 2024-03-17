require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

morgan.token('content', (request, response) => {
  return JSON.stringify(request.body) || '-'
})

app.use(morgan(':method :url :status :content'))


// let persons = [
//     {
//       "id": 1,
//       "name": "Arto Hellas",
//       "number": "040-123456"
//     },
//     {
//       "id": 2,
//       "name": "Ada Lovelace",
//       "number": "39-44-5323523"
//     },
//     {
//       "id": 3,
//       "name": "Dan Abramov",
//       "number": "12-43-234345"
//     },
//     {
//       "id": 4,
//       "name": "Mary Poppendieck",
//       "number": "39-23-6423122"
//     }
// ]
app.get('/info', (request, response) => {
    let date = new Date()
    response.send(
        `<p>Phonebook has info for ${persons.length} people</p>` +
        `<p>${date}</p>`
        )
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      response.json(person)
    })
  })

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({error: 'content missing'})
    // 400 客户端错误
  }

  const name = body.name
  Person.findOne({name: name}).then(isDuplicate => {
    if (isDuplicate) {
      return response.status(400).json({error: 'name must be unique'})
    }
  })
  
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})


app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      if (result) {
        response.status(201).end()
      } else {
        response.status(404).json({error: 'not found'})
      }
    })
})

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server is running on port ${PORT}`)