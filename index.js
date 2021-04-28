const {response, request} = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

let persons = [
    {
        id:1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id:2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id:3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id:4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]


app.use(cors())
app.use(express.json())
morgan.token('content', (req,res) => {return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

app.get('/', (request,response) => {
    response.send('Hei')
})

app.get('/api/persons', (request,response) => {
    response.json(persons)
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

    if (!body){
        return response.status(400).json({
            error:'content missing'
        })
    }
    if (!body.name){
        return response.status(400).json({
            error:'name missing'
        }) 
    }

    const found = persons.find(person => person.name === body.name)
    if (found){
        return response.status(409).json({
            error:'name must be unique'
        }) 
    }

    const newperson = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(newperson)
    response.json(newperson)

})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})