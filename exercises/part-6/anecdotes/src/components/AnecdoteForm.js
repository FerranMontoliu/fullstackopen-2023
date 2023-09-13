import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const onAddAnecdote = async (event) => {
    // Prevent default
    event.preventDefault()

    // Get anecdote content and reset form
    const anecdoteContent = event.target.anecdote.value
    event.target.anecdote.value = ''

    // Create new anecdote in the backend and add it to the app state
    dispatch(createAnecdote(anecdoteContent))

    // Display notification for 5 seconds
    dispatch(setNotification(`You created '${anecdoteContent}'`, 5))
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={onAddAnecdote}>
        <div><input required name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
