import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import Anecdote from './Anecdote'
import Filter from './Filter'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    anecdotes
      .filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
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
            dispatch(voteAnecdote(anecdote.id))
            dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
          }}
        />
      )}
    </div>
  )
}

export default AnecdoteList
