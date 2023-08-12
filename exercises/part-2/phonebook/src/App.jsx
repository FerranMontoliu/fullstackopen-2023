import { useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
    ])
    const [filterQuery, setFilterQuery] = useState('')

    const handleOnPersonAdded = (name, number) => {
        if (!name || !number) {
            alert('Please fill both name and number')
            return
        }

        if (persons.some(person => person.name === name)) {
            alert(`${name} is already added to phonebook.`)
            return
        }

        setPersons([...persons, { id: persons.length + 1, name, number }])
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter
                filterQuery={filterQuery}
                onChange={event => {
                    setFilterQuery(event.target.value)
                }}
            />

            <h3>Add a new</h3>
            <PersonForm onSubmit={handleOnPersonAdded} />

            <h3>Numbers</h3>
            <Persons
                persons={persons.filter(person =>
                    person.name
                        .toLowerCase()
                        .includes(filterQuery.toLowerCase()),
                )}
            />
        </div>
    )
}

export default App
