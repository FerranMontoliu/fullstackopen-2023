const Anecdote = ({ title, anecdote, votes }) => {
    return (
        <div>
            <h2>{title}</h2>
            <p>{anecdote}</p>
            <p>Has {votes} votes</p>
        </div>
    )
}

export default Anecdote
