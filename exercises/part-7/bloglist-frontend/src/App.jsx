import { useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm.jsx'
import AppContent from './components/AppContent.jsx'
import Notification from './components/Notification.jsx'
import Toggleable from './components/Toggleable.jsx'
import { useUser } from './contexts/UserContext.jsx'

const App = () => {
  const [user, userDispatch] = useUser()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'SET_USER', payload: user })
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <h1 style={{ color: 'teal', fontWeight: 'bold' }}>Blogs</h1>

      <Notification />

      {user === null && (
        <Toggleable buttonLabel="Log in">
          <LoginForm />
        </Toggleable>
      )}

      {user !== null && <AppContent />}
    </div>
  )
}

export default App
