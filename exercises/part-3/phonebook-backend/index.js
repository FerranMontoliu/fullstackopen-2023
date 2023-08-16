require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

// Define the port on which the server will run
const PORT = process.env.PORT ?? 3001

// Create an Express app
const app = express()

/**
 * Custom token function for Morgan middleware.
 * This token displays the request body for POST requests.
 *
 * @param {object} req - The Express request object.
 *
 * @returns {string} - The request body as a JSON string, or '-' for non-POST requests.
 */
morgan.token('req-body', req => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }

  return '-'
})

/**
 * Express middleware for handling errors.
 *
 * @param {Error} error - The error object.
 * @param {import('express').Request} request - The Express request object.
 * @param {import('express').Response} response - The Express response object.
 * @param {import('express').NextFunction} next - The next middleware.
 *
 * @returns {void | import('express').Response} - If the error is a CastError or a ValidationError, returns a response with a 400 status and an error message. Otherwise, calls the next middleware with the error.
 */
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  switch (error.name) {
  case 'CastError':
    return response.status(400).send({ error: 'Malformatted id.' })

  case 'ValidationError':
    return response.status(400).json({ error: error.message })

  default:
    next(error)
  }
}

/**
 * Express middleware for handling unknown endpoints.
 *
 * @param {import('express').Request} request - The Express request object.
 * @param {import('express').Response} response - The Express response object.
 *
 * @returns {void} - Sends a 404 response with an error message for unknown endpoints.
 */
const unknownEndpointHandler = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint.' })
}

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

// Display info about the phonebook
app.get('/info', (request, response, next) => {
  Person.count({})
    .then(numEntries => {
      response.send(`
                <p>Phonebook has info for ${numEntries} people</p>
                <p>${new Date()}</p>
            `)
    })
    .catch(error => next(error))
})

// Get all persons in the phonebook
app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(allPersons => {
      response.json(allPersons)
    })
    .catch(error => {
      console.error(error)
      response.status(500).end()
    })
})

// Get a specific person by ID
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(foundPerson => {
      if (foundPerson) {
        response.json(foundPerson)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// Delete a specific person by ID
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// Add a new person to the phonebook
app.post('/api/persons', (request, response, next) => {
  const person = new Person({
    name: request.body.name,
    number: request.body.number,
  })

  person
    .save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

// Update a person from the phonebook
app.put('/api/persons/:id', (request, response, next) => {
  const person = {
    name: request.body.name,
    number: request.body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

// Handler of requests with unknown endpoint
app.use(unknownEndpointHandler)
// Error handling middleware
app.use(errorHandler)
