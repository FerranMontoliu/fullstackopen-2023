import Person from './Person'

const Persons = ({ persons, onPersonDeleted }) => {
    return (
        <div>
            {persons.map(person => (
                <Person
                    key={person.id}
                    person={person}
                    onPersonDeleted={onPersonDeleted}
                />
            ))}
        </div>
    )
}

export default Persons
