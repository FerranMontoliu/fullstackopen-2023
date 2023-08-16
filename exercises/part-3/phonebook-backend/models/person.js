const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('Connecting to', url)

// Connect to MongoDB
mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.log('Error connecting to MongoDB:', error.message)
  })

// Define person schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  number: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator: text => /^\d{2,3}-\d+$/.test(text),
      message: props =>
        `${props.value} is not a valid phone number. The format should be 2 or 3 numbers, followed by a dash (-), and more numbers.`,
    },
  },
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
