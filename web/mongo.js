import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

if (process.argv.length < 3) {
  console.log('Please provide a password as an argument: node mongo.js <password>')
  process.exit(1)
} else if (process.argv.length == 4 || process.argv.length > 5) {
    console.log('Please provide a password, name, and number as arguments: node mongo.js <password> <name> <number>')
  process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://backend:${password}@fsdevmongo.vrbud.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: {
      type: String,
      minLength: 3,
      required: true,
      unique: true
  },
  number: {
      type: String,
      minlength: 8,
      required: true
  }
})

personSchema.plugin(uniqueValidator);

const Person = mongoose.model('Person', personSchema)

if(process.argv.length == 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(result => {
        console.log('added', `${result.name} number ${result.number}`, 'to phonebook')
        mongoose.connection.close()
    })
}

if(process.argv.length == 3) {
    Person
        .find({})
        .then(persons=> {
            console.log('phonebook:')
            persons.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })
}



