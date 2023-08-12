const AnecdoteOfTheDay = ({ anecdote, votes }) => {
    return (
        <div>
            <h2>Anecdote of the day</h2>
            <p>{anecdote}</p>
            <p>Has {votes} votes</p>
        </div>
    )
}

export default AnecdoteOfTheDay
