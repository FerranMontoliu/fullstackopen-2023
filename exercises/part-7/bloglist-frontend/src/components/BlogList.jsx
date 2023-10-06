import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import {
  Button,
  Card,
  Center,
  Group,
  Loader,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
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

  const blogs = result.data

  return (
    <Stack my="md">
      {blogs.map((blog) => (
        <Card key={blog.id} shadow="md" padding="md" radius="md" withBorder>
          <Group justify="space-between">
            <Stack>
              <Title order={3}>{blog.title}</Title>
              <Text>{blog.author}</Text>
            </Stack>

            <Link to={`/blogs/${blog.id}`}>
              <Button variant="light" mt="sm">
                View
              </Button>
            </Link>
          </Group>
        </Card>
      ))}
    </Stack>
  )
}

export default BlogList