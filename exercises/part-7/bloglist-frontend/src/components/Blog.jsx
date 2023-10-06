import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs.js'
import { setError, setInfo } from '../utils/notifications.js'
import { useNotificationDispatch } from '../contexts/NotificationContext.jsx'
import { useUserValue } from '../contexts/UserContext.jsx'
import { Anchor, Button, Card, Group, Stack, Text, Title } from '@mantine/core'
import { IconThumbUp } from '@tabler/icons-react'

const Blog = ({ blog }) => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  const user = useUserValue()

  const updateBlogMutation = useMutation({
    mutationFn: blogService.updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setInfo(notificationDispatch, `You liked the blog '${blog.title}' by '${blog.author}'.`)
    },
    onError: (error) => {
      setError(notificationDispatch, error.response.data.error)
    }
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setInfo(notificationDispatch, `You deleted the blog '${blog.title}' by '${blog.author}'.`)
    },
    onError: (error) => {
      setError(notificationDispatch, error.response.data.error)
    }
  })

  const handleBlogLiked = blog => {
    const updatedData = {
      user: blog.user?.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }

    updateBlogMutation.mutate({ id: blog.id, updatedData })
  }

  const handleBlogDeleted = blog => {
    const { id, title, author } = blog

    const isDeleteConfirmed = window.confirm(`Remove blog '${title}' by '${author}'?`)
    if (!isDeleteConfirmed) {
      return
    }

    deleteBlogMutation.mutate(id)
  }

  return (
    <Card shadow="md" padding="md" radius="md" withBorder>
      <Title order={3}>{blog.title}</Title>
      <Text>{blog.author}</Text>

      <Group mt="sm">
        <Text fw="bold">URL:</Text>
        <Anchor href={blog.url} target="_blank" rel="noreferrer">{blog.url}</Anchor>
      </Group>

      <Group>
        <Text fw="bold">{blog.likes} likes</Text>
        <Button onClick={() => handleBlogLiked(blog)} variant="light" leftSection={<IconThumbUp size={14} /> }>Like</Button>
      </Group>

      <Group>
        <Text fw="bold">User:</Text>
        <Text>{blog.user?.name}</Text>
      </Group>

      {user.username && user.username === blog.user?.username &&
            <Button onClick={() => handleBlogDeleted(blog)} mt="sm" variant="light">Remove</Button>}
    </Card>
  )
}

export default Blog
