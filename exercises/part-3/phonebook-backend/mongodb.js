const mongoose = require('mongoose')

// Get number of params
const numParams = process.argv.length

// Check for invalid number of params
if (numParams !== 3 && numParams !== 5) {
    console.error('Invalid number of parameters')
    process.exit(1)
}

// Init db connection
const password = process.argv[2]
const url = `mongodb+srv://fullstack2023:${password}@cluster0.zcqmx.mongodb.net/fullstack2023?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose
    .connect(url)
    .then(response => {
        console.log('Connected to db successfully')
    })
    .catch(error => {
        console.error(error)
        process.exit(1)
    })

// Define mongodb schema and model
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})
const Person = mongoose.model('Person', personSchema)

// Display all the entries in the phonebook
if (numParams === 3) {
    Person.find({})
        .then(result => {
            console.log('Phonebook:')
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
            process.exit(0)
        })
        .catch(error => {
            console.error(error)
            process.exit(1)
        })
}

// Add one entry to the phonebook
if (numParams === 5) {
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name,
        number,
    })

    person
        .save()
        .then(result => {
            console.log(`Added ${name} number ${number} to phonebook.`)
            mongoose.connection.close()
            process.exit(0)
        })
        .catch(error => {
            console.error(error)
            process.exit(1)
        })
}
