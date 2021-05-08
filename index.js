require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')
const { request, response } = require('express')

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

app.get('/api/persons/:id', (request,response,next) => {
    Person.findById(request.params.id)
    .then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    }).catch(error => {
        next(error)
    })
})

app.get('/info', (request,response) => {



    const getLen = () =>{
        Person.find({}).then(result => {
            return result
        })
    }

    console.log(getLen())

    response.send(`<div> 
    Phonebook contains information on ${getLen().length} people.  
    </div>
    <div> ${new Date} </div>`)
})

const generateId = () => {
    return Math.floor(Math.random() * (1000 - 100) + 100)
}


app.delete('/api/persons/:id', (request,response,next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request,response,next) =>{
    const body = request.body

    const personToUpdate = {
        name: body.name,
        number: body.number
    }
    Person.findByIdAndUpdate(request.params.id,personToUpdate,{new:true})
        .then(updatedPerson =>{
            response.json(updatedPerson)
        })
        .catch(error => next(error))
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

const unknownEndpoint = (request,response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }
  
    next(error)
  }

app.use(errorHandler)



const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})