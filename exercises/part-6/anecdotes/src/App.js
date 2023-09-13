import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'
import { setNotes } from './reducers/anecdoteReducer'

const App = () => {
  const notification = useSelector(state => state.notification)

  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService
      .getAllAnecdotes().then(notes => dispatch(setNotes(notes)))
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      {notification !== null && <Notification/>}
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App