const express = require('express')
const app = express()

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

app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/info', (request, response) => {
    response.send(`<div>Phonebook has info for ${persons.length} people</div></br>
        <div>${new Date().toString()}</div>
    `)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if(person){response.json(person)}
    else{
        response.statusMessage = `Person with ID of ${request.params.id} was not found`
        response.status(404).end()
        }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    var exists = persons.find(person => person.id === id)
    if(exists) {
        persons = persons.filter(person => person.id !== id)
        response.status(204).end()
    }
    response.statusMessage = `Person with ID of ${request.params.id} was not found`
    response.status(404).end()
  })

  app.post('/api/persons', (request, response) => {
    const person = request.body
    console.log(person)
    response.json(person)
  })

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})