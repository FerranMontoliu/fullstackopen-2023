import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import Blog from './Blog.jsx'
import { Center, Loader, Stack, Text } from '@mantine/core'

const BlogList = () => {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  if (result.isLoading) {
    return <Center><Loader /></Center>
  }

  if (result.isError) {
    return <Text>Blog service not available due to problems in server</Text>
  }

  const blogs = result.data

  return (
    <Stack my="md">
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </Stack>
  )
}

export default BlogList