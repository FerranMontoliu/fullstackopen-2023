import { useEffect, useState } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm.jsx'
import AppContent from './components/AppContent.jsx'
import Notification from './components/Notification.jsx'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const setError = message => {
    setNotification({
      message,
      type: 'error',
    })

    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const setInfo = message => {
    setNotification({
      message,
      type: 'info',
    })

    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (username, password, afterLogin) => {
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      afterLogin()
      setInfo(`Logged in as ${user.name}`)
    } catch (error) {
      setError(error.response.data.error)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    blogService.setToken(null)
    setUser(null)
  }

  const handleBlogCreated = async (blog, afterCreation) => {
    try {
      const createdBlog = await blogService.create(blog)
      setBlogs([...blogs, createdBlog])
      afterCreation()
      setInfo(`A new blog '${blog.title}' by '${blog.author}' added`)
    } catch (error) {
      setError(error.response.data.error)
    }
  }

  return (
    <div>
      {notification !== null && (
        <Notification
          message={notification.message}
          type={notification.type}
        />
      )}

      {user === null ?
        <LoginForm handleLogin={handleLogin}/> :
        <AppContent
          user={user}
          blogs={blogs}
          handleLogout={handleLogout}
          handleBlogCreated={handleBlogCreated}/>
      }
    </div>
  )
}

export default App