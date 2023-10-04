import { useEffect, useState } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm.jsx'
import AppContent from './components/AppContent.jsx'
import Notification from './components/Notification.jsx'
import Toggleable from './components/Toggleable.jsx'
import { useNotificationDispatch } from './contexts/NotificationContext.jsx'
import { setError, setInfo } from './utils/notifications.js'

const App = () => {
  const [user, setUser] = useState(null)
  const notificationDispatch = useNotificationDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = (username, password, afterLogin) => {
    loginService
      .login({
        username,
        password,
      })
      .then((user) => {
        window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
        blogService.setToken(user.token)
        setUser(user)
        afterLogin()
        setInfo(notificationDispatch, `Logged in as ${user.name}`)
      })
      .catch((error) => {
        setError(notificationDispatch, error.response.data.error)
      })
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    blogService.setToken(null)
    setUser(null)
  }

  return (
    <div>
      <h1 style={{ color: 'teal', fontWeight: 'bold' }}>Blogs</h1>

      <Notification />

      {user === null && (
        <Toggleable buttonLabel="Log in">
          <LoginForm handleLogin={handleLogin} />
        </Toggleable>
      )}

      {user !== null && <AppContent user={user} handleLogout={handleLogout} />}
    </div>
  )
}

export default App
