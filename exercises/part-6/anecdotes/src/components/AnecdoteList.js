import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import Anecdote from './Anecdote'
import Filter from './Filter'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    anecdotes
      .filter((anecdote) => anecdote.content.toLowerCase().includes(filter))
      .sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()

  return (
    <div>
      <Filter />

      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={(event) => {
            event.preventDefault()
            dispatch(vote(anecdote.id))
          }}
        />
      )}
    </div>
  )
}

export default AnecdoteList
