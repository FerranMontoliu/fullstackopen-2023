const AnecdoteDetails = ({ anecdote }) => {
  if (anecdote === null) {
    return (
      <div>Anecdote not found...</div>
    )
  }

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>fore more info see <a href={anecdote.info} target="_blank" rel="noreferrer">{anecdote.info}</a></p>
    </div>
  )
}

export default AnecdoteDetails