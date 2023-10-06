import { useQuery } from '@tanstack/react-query'
import userService from '../services/users.js'
import { Center, Loader, Stack, Text, Title, List, ThemeIcon,  } from '@mantine/core'
import { useParams } from 'react-router-dom'
import { IconArticle } from '@tabler/icons-react'

const UserBlogList = ({ blogs }) => {
  if (blogs === undefined || blogs === null) {
    return <Text>No blogs found for this user</Text>
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
      {blogs.map((blog) => (
        <List.Item key={blog.id}>{blog.title}</List.Item>
      ))}
    </List>
  )
}

const UserScreen = () => {
  const { userId } = useParams()

  const result = useQuery({
    queryKey: ['user', { userId }],
    queryFn: () => userService.getById(userId),
  })

  if (result.isLoading) {
    return <Center><Loader /></Center>
  }

  if (result.isError) {
    return <Text>User service not available due to problems in server</Text>
  }

  const user = result.data

  return (
    <Stack>
      <Title order={2}>{user.name}</Title>

      <Title order={3}>Added blogs</Title>
      <UserBlogList blogs={user.blogs} />
    </Stack>
  )
}

export default UserScreen