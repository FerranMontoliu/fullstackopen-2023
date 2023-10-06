import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs.js'
import { setError, setInfo } from '../utils/notifications.js'
import { useNotificationDispatch } from '../contexts/NotificationContext.jsx'
import { Button, Stack, TextInput, Title } from '@mantine/core'

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
    <Stack>
      <Title order={2}>Create new blog</Title>

      <form onSubmit={onSubmit}>
        <Stack>
          <TextInput
            label="Title"
            placeholder="Title"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />

          <TextInput
            label="Author"
            placeholder="Author"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />

          <TextInput
            label="URL"
            placeholder="URL"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />

          <Button type="submit">
            Create
          </Button>
        </Stack>
      </form>
    </Stack>
  )
}

export default CreateBlogForm