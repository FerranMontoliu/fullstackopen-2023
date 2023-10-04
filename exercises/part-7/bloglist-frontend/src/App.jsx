import { useEffect, useRef, useState } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm.jsx'
import AppContent from './components/AppContent.jsx'
import Notification from './components/Notification.jsx'
import Toggleable from './components/Toggleable.jsx'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

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
    blogService
      .getAll()
      .then(blogs_ => {
        const sortedBlogs = [...blogs_]
        sortedBlogs.sort((a, b) => b.likes - a.likes)
        setBlogs(sortedBlogs)
      })
  }, [])

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
        window.localStorage.setItem(
          'loggedBloglistUser', JSON.stringify(user)
        )
        blogService.setToken(user.token)
        setUser(user)
        afterLogin()
        setInfo(`Logged in as ${user.name}`)
      })
      .catch((error) => {
        setError(error.response.data.error)
      })
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    blogService.setToken(null)
    setUser(null)
  }

  const handleBlogCreated = (blog, afterCreation) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .createBlog(blog)
      .then((createdBlog_) => {
        const createdBlog = {
          ...createdBlog_,
          user: {
            id: createdBlog_.user,
            username: user.username,
            name: user.name,
          }
        }

        setBlogs([...blogs, createdBlog])
        afterCreation()
        setInfo(`A new blog '${blog.title}' by '${blog.author}' added`)
      })
      .catch((error) => {
        setError(error.response.data.error)
      })
  }

  const handleBlogLiked = (blog) => {
    const updatedData = {
      user: blog.user?.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }

    blogService
      .updateBlog(blog.id, updatedData)
      .then((updatedBlog_) => {
        const updatedBlog = {
          ...updatedBlog_,
          user: blog.user,
        }

        const blogToUpdateIndex = blogs.findIndex(
          blog_ => blog_.id === blog.id,
        )

        if (blogToUpdateIndex === -1) {
          return
        }

        const sortedBlogs = [...blogs]
        sortedBlogs[blogToUpdateIndex] = updatedBlog
        sortedBlogs.sort((a, b) => b.likes - a.likes)
        setBlogs(sortedBlogs)

        setInfo(`You liked the blog '${blog.title}' by '${blog.author}'.`)
      })
      .catch((error) => {
        setError(error.response.data.error)
      })
  }

  const handleBlogDeleted = ({ title, author, id }) => {
    const isDeleteConfirmed = window.confirm(`Remove blog '${title}' by '${author}'?`)
    if (!isDeleteConfirmed) {
      return
    }

    blogService
      .deleteBlog(id)
      .then(() => {
        const blogToDeleteIndex = blogs.findIndex(
          blog => blog.id === id,
        )

        if (blogToDeleteIndex === -1) {
          return
        }

        const blogs_ = [...blogs]
        blogs_.splice(blogToDeleteIndex, 1)
        setBlogs(blogs_)

        setInfo(`Blog '${title}' by '${author}' removed successfully.`)
      })
      .catch((error) => {
        setError(error.response.data.error)
      })
  }

  return (
    <div>
      <h1 style={{ color: 'teal', fontWeight: 'bold' }}>Blogs</h1>

      {notification !== null && (
        <Notification
          message={notification.message}
          type={notification.type}
        />
      )}

      {user === null &&
          <Toggleable buttonLabel="Log in">
            <LoginForm handleLogin={handleLogin} />
          </Toggleable>
      }

      {user !== null &&
        <AppContent
          user={user}
          blogs={blogs}
          handleLogout={handleLogout}
          handleBlogCreated={handleBlogCreated}
          handleBlogLiked={handleBlogLiked}
          handleBlogDeleted={handleBlogDeleted}
          blogFormRef={blogFormRef} />
      }
    </div>
  )
}

export default App