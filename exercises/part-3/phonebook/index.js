const express = require('express')

const PORT = 3001
const app = express()

app.use(express.json())
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

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

const generateRandomId = () => {
    return Math.floor(Math.random() * 1_000_000)
}

app.get('/info', (request, response) => {
    response.send(`
        <p>Phonebook has info for ${phonebookEntries.length} people</p>
        <p>${new Date()}</p>
    `)
})

app.get('/api/persons', (request, response) => {
    response.json(phonebookEntries)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = phonebookEntries.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    phonebookEntries = phonebookEntries.filter(person => person.id !== id)

    response.status(204).end()
})

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
