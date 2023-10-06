import blogService from '../services/blogs.js'
import { useUser } from '../contexts/UserContext.jsx'
import { Button, Group, Text } from '@mantine/core'

const LoggedInUserInfo = () => {
  const [user, userDispatch] = useUser()

  const onLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    blogService.setToken(null)
    userDispatch({ type: 'LOGOUT_USER' })
  }

  return (
    <Group justify="space-between">
      <Text>Logged in as <b>{user.name}</b></Text>

      <Button onClick={onLogout} variant="outline" color="red">
        Log out
      </Button>
    </Group>
  )
}

export default LoggedInUserInfo