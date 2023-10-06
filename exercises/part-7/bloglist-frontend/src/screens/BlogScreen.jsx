import { useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs.js'
import { Button, Card, Center, Group, List, Loader, Stack, Text, TextInput, ThemeIcon, Title } from '@mantine/core'
import Blog from '../components/Blog.jsx'
import { IconArticle } from '@tabler/icons-react'
import { useState } from 'react'
import { setError, setInfo } from '../utils/notifications.js'
import { useNotificationDispatch } from '../contexts/NotificationContext.jsx'

const CommentList = ({ comments }) => {
  if (comments === undefined || comments === null || comments.length === 0) {
    return (
      <Text>No comments found for this blog</Text>
    )
  }

  return (
    <List
      spacing="md"
      size="sm"
      center
      icon={
        <ThemeIcon size={32} radius="xl">
          <IconArticle size="1rem"/>
        </ThemeIcon>
      }
    >
      {comments.map((comment, i) => (
        <List.Item key={i}>{comment}</List.Item>
      ))}
    </List>
  )
}

const CommentsContainer = ({ blogId, comments }) => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const [comment, setComment] = useState('')

  const addCommentMutation = useMutation({
    mutationFn: blogService.commentBlog,
    onSuccess: () => {
      setComment('')

      queryClient.invalidateQueries({ queryKey: ['blog'] })
      queryClient.invalidateQueries({ queryKey: ['blogs'] })

      setInfo(
        notificationDispatch,
        'Your comment was successfully published',
      )
    },
    onError: (error) => {
      setError(notificationDispatch, error.response.data.error)
    },
  })

  const handleCommentAdded = (event) => {
    event.preventDefault()

    addCommentMutation.mutate({ blogId, comment })
  }

  return (
    <Card shadow="md" padding="md" radius="md" withBorder>
      <Stack>
        <Title order={3}>Comments</Title>

        <form onSubmit={handleCommentAdded}>
          <Group align="flex-end" justify="space-between">
            <TextInput
              w="80%"
              label="Comment message"
              placeholder="Add comment"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />

            <Button type="submit">Add comment</Button>
          </Group>
        </form>

        <CommentList comments={comments} />
      </Stack>
    </Card>
  )
}

const BlogScreen = () => {
  const { blogId } = useParams()

  const result = useQuery({
    queryKey: ['blog', { blogId }],
    queryFn: () => blogService.getById(blogId),
  })

  if (result.isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    )
  }

  if (result.isError) {
    return <Text>Blog service not available due to problems in server</Text>
  }

  const blog = result.data

  return (
    <Stack>
      <Title order={2}>Blog details</Title>

      <Blog blog={blog} />
      <CommentsContainer blogId={blog.id} comments={blog.comments} />
    </Stack>
  )
}

export default BlogScreen