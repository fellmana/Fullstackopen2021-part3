const mongoose = require('mongoose')

if (process.argv.length <3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
`mongodb+srv://dbuser:${password}@cluster0.akiym.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url,{ useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify:false,useCreateIndex:true })

const personSchema = new mongoose.Schema({
  name:String,
  number:String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 4){
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })

} else {
  const nameInput = process.argv[3]

  const numberInput = process.argv[4]

  const person =  new Person({
    name:nameInput,
    number:numberInput,
  })

  person.save().then(() => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}