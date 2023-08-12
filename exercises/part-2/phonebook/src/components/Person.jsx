const Person = ({ person: { name, number } }) => {
    return (
        <p>
            {name}: {number}
        </p>
    )
}

export default Person
