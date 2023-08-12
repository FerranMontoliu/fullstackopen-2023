const Person = ({ person, onPersonDeleted }) => {
    const { name, number } = person

    return (
        <p>
            {name}: {number}{' '}
            <button
                onClick={() => {
                    onPersonDeleted(person)
                }}>
                Delete
            </button>
        </p>
    )
}

export default Person
