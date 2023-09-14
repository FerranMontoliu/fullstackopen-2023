import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests.js'
import { useNotificationDispatch } from '../NotificationContext.jsx'

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch()

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (error) => {
      notificationDispatch({
        type: 'DISPLAY',
        payload: error,
      })

      setTimeout(() => {
        notificationDispatch({
          type: 'CLEAR',
        })
      }, 5_000)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    newAnecdoteMutation.mutate({
      content,
      votes: 0,
    })

    notificationDispatch({
      type: 'DISPLAY',
      payload: `anecdote '${content}' created`,
    })

    setTimeout(() => {
      notificationDispatch({
        type: 'CLEAR',
      })
    }, 5_000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input required name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
