require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
morgan.token('content', (req,res) => {return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

app.get('/', (request,response) => {
    response.send('Hei')
})

app.get('/api/persons', (request,response) => {
    Person.find({}).then(result => {
        response.json(result)
    })
})

app.get('/api/persons/:id', (request,response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/info', (request,response) => {
    response.send(`<div> 
    Phonebook contains information on ${persons.length} people.  
    </div>
    <div> ${new Date} </div>`)
})

const generateId = () => {
    return Math.floor(Math.random() * (1000 - 100) + 100)
}


app.delete('/api/persons/:id', (request,response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    console.log(`Deleted id ${id}`)
})

app.post('/api/persons/',(request, response) =>{
    const body = request.body
    if (body.name === undefined){
        return response.status(400).json({error:'name missing'})
    }

    const newperson = new Person({
        name: body.name,
        number: body.number
    })

    newperson.save().then(savedPerson => {
        response.json(savedPerson)
    })
})


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})