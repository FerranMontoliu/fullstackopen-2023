import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import axios from 'axios'

const App = () => {
    const [persons, setPersons] = useState([])
    const [filterQuery, setFilterQuery] = useState('')

    useEffect(() => {
        axios.get('http://localhost:3001/persons').then(response => {
            setPersons(response.data)
        })
    }, [])

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
