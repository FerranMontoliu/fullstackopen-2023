import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs.js'
import { setError, setInfo } from '../utils/notifications.js'
import { useNotificationDispatch } from '../contexts/NotificationContext.jsx'

const CreateBlogForm = ({ toggleVisibility }) => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlogMutation = useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setInfo(
        notificationDispatch,
        `A new blog '${title}' by '${author}' added`,
      )

      setTitle('')
      setAuthor('')
      setUrl('')
    },
    onError: (error) => {
      setError(notificationDispatch, error.response.data.error)
    },
  })

  const onSubmit = (event) => {
    event.preventDefault()
    toggleVisibility()
    createBlogMutation.mutate({ title, author, url })
  }

  return (
    <div>
      <h2>Create new blog</h2>

      <form onSubmit={onSubmit}>
        <div>
          Title:
          <input
            className="create-blog-form--title-input"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
          Author
          <input
            className="create-blog-form--author-input"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div>
          URL
          <input
            className="create-blog-form--url-input"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

        <button className="create-blog-form--submit-btn" type="submit">
          Create
        </button>
      </form>
    </div>
  )
}

export default CreateBlogForm