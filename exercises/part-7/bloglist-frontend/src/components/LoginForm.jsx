import { useState } from 'react'
import loginService from '../services/login.js'
import blogService from '../services/blogs.js'
import { setError, setInfo } from '../utils/notifications.js'
import { useNotificationDispatch } from '../contexts/NotificationContext.jsx'
import { useUserDispatch } from '../contexts/UserContext.jsx'

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
    <div>
      <h2>Log in to application</h2>

      <form onSubmit={onSubmit}>
        <div>
          Username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          Password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <button id="login-button" type="submit">login</button>
      </form>
    </div>

  )
}

export default LoginForm