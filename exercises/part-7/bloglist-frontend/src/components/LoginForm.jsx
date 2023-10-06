import { useState } from 'react'
import loginService from '../services/login.js'
import blogService from '../services/blogs.js'
import { setError, setInfo } from '../utils/notifications.js'
import { useNotificationDispatch } from '../contexts/NotificationContext.jsx'
import { useUserDispatch } from '../contexts/UserContext.jsx'
import { Button, Center, Stack, TextInput, Title } from '@mantine/core'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const notificationDispatch = useNotificationDispatch()
  const userDispatch = useUserDispatch()

  const onSubmit = (event) => {
    event.preventDefault()
    loginService
      .login({
        username,
        password,
      })
      .then((user) => {
        window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
        blogService.setToken(user.token)
        userDispatch({ type: 'SET_USER', payload: user })
        setUsername('')
        setPassword('')
        setInfo(notificationDispatch, `Logged in as ${user.name}`)
      })
      .catch((error) => {
        setError(notificationDispatch, error.response.data.error)
      })

  }

  return (
    <Stack>
      <Title order={2}>Log in to application</Title>

      <form onSubmit={onSubmit}>
        <Stack>
          <TextInput
            label="Username"
            placeholder="Username"
            name="username"
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}/>


          <TextInput
            label="Password"
            placeholder="Password"
            name="password"
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)} />

          <Button id="login-button" type="submit">Log in</Button>
        </Stack>
      </form>
    </Stack>
  )
}

export default LoginForm