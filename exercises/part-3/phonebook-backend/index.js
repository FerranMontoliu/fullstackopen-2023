const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

// Define the port on which the server will run
const PORT = process.env.PORT ?? 3001

// Create an Express app
const app = express()

/**
 * Custom token function for Morgan middleware.
 * This token displays the request body for POST requests.
 *
 * @param {object} req - The Express request object.
 * @returns {string} - The request body as a JSON string, or '-' for non-POST requests.
 */
morgan.token('req-body', req => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    }

    return '-'
})

// Allow requests from all origins
app.use(cors())
// Use Morgan middleware with custom token and predefined format
app.use(
    morgan(
        ':method :url :status :res[content-length] - :response-time ms :req-body',
    ),
)
// Parse incoming JSON data
app.use(express.json())
// Make express show static content
app.use(express.static('dist'))

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

// Phonebook entries
let phonebookEntries = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '040-123456',
    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: '39-44-5323523',
    },
    {
        id: 3,
        name: 'Dan Abramov',
        number: '12-43-234345',
    },
    {
        id: 4,
        name: 'Mary Poppendieck',
        number: '39-23-6423122',
    },
]

/**
 * Generates a random ID between 0 and 1,000,000
 *
 * @returns {number} - A random ID between 0 and 1,000,000
 */
const generateRandomId = () => {
    return Math.floor(Math.random() * 1_000_000)
}

// Display info about the phonebook
app.get('/info', (request, response) => {
    response.send(`
        <p>Phonebook has info for ${phonebookEntries.length} people</p>
        <p>${new Date()}</p>
    `)
})

// Get all persons in the phonebook
app.get('/api/persons', (request, response) => {
    response.json(phonebookEntries)
})

// Get a specific person by ID
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = phonebookEntries.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

// Delete a specific person by ID
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    phonebookEntries = phonebookEntries.filter(person => person.id !== id)

    response.status(204).end()
})

// Add a new person to the phonebook
app.post('/api/persons', (request, response) => {
    if (!request.body.name) {
        return response.status(400).json({
            error: 'Name is missing.',
        })
    }

    if (!request.body.number) {
        return response.status(400).json({
            error: 'Number is missing.',
        })
    }

    if (phonebookEntries.some(person => person.name === request.body.name)) {
        return response.status(400).json({
            error: 'Name must be unique.',
        })
    }

    const person = {
        name: request.body.name,
        number: request.body.number,
        id: generateRandomId(),
    }

    phonebookEntries = phonebookEntries.concat(person)

    response.json(person)
})
