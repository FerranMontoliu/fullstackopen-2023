import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs.js'
import { Center, Loader, Stack, Text, Title } from '@mantine/core'
import Blog from '../components/Blog.jsx'

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
    </Stack>
  )
}

export default BlogScreen