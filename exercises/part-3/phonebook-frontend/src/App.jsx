import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [filterQuery, setFilterQuery] = useState('')
    const [notification, setNotification] = useState(null)

    const setError = message => {
        setNotification({
            message,
            type: 'error',
        })
    }

    const setInfo = message => {
        setNotification({
            message,
            type: 'info',
        })
    }

    useEffect(() => {
        if (notification === null) {
            return
        }

        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }, [notification])

    useEffect(() => {
        personsService
            .getAllPeople()
            .then(response => {
                setPersons(response.data)
            })
            .catch(error => {
                console.error(error)
                setError('Error while fetching the people in your phonebook.')
            })
    }, [])

    const handleOnPersonAdded = (formData, afterSubmit) => {
        const { name, number } = formData

        if (!name || !number) {
            window.alert('Please fill both name and number')
            return
        }

        const personInDbIndex = persons.findIndex(
            person => person.name === name,
        )
        if (personInDbIndex !== -1) {
            const isUpdateConfirmed = window.confirm(
                `${name} is already added to phonebook, replace the old number with a new one?`,
            )
            if (!isUpdateConfirmed) {
                return
            }

            const id = persons[personInDbIndex].id
            const updatedPerson = { id, name, number }

            personsService
                .updatePerson(updatedPerson.id, updatedPerson)
                .then(response => {
                    const persons_ = [...persons]
                    persons_[personInDbIndex] = updatedPerson

                    setPersons(persons_)
                    afterSubmit()

                    setInfo(
                        `Updated number from person with name '${updatedPerson.name}'.`,
                    )
                })
                .catch(error => {
                    console.error(error)

                    if (error.response.status === 404) {
                        setError(
                            `Information of person with name '${updatedPerson.name}' has already been removed from server.`,
                        )
                    } else {
                        setError(
                            `Error while trying to update person with name '${updatedPerson.name}'.`,
                        )
                    }
                })
            return
        }

        const newPerson = { id: persons.length + 1, name, number }
        personsService
            .createPerson(newPerson)
            .then(response => {
                setPersons([...persons, newPerson])
                afterSubmit()

                setInfo(`Added person with name '${newPerson.name}'.`)
            })
            .catch(error => {
                console.error(error)
                setError(
                    `Error while trying to create person with name '${newPerson.name}'.`,
                )
            })
    }

    const handleOnPersonDeleted = ({ id, name }) => {
        const isDeleteConfirmed = window.confirm(`Delete ${name}?`)
        if (!isDeleteConfirmed) {
            return
        }

        personsService.deletePerson(id).then(response => {
            const personToDeleteIndex = persons.findIndex(
                contact => contact.id === id,
            )

            if (personToDeleteIndex === -1) {
                return
            }

            const persons_ = [...persons]
            persons_.splice(personToDeleteIndex, 1)
            setPersons(persons_)
        })
    }

    return (
        <div>
            <h2>Phonebook</h2>
            {notification !== null && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                />
            )}

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
                onPersonDeleted={handleOnPersonDeleted}
            />
        </div>
    )
}

export default App
