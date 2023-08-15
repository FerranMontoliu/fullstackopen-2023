const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('Connecting to', url)

// Connect to MongoDB
mongoose
    .connect(url)
    .then(result => {
        console.log('Connected to MongoDB')
    })
    .catch(error => {
        console.log('Error connecting to MongoDB:', error.message)
    })

// Define person schema
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

// Overwrite the toJSON function for the person schema
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

// Define person model
const Person = mongoose.model('Person', personSchema)

module.exports = Person
