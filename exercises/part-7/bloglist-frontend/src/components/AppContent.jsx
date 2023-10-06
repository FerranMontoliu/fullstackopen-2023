import CreateBlogForm from './CreateBlogForm.jsx'
import BlogList from './BlogList.jsx'
import Toggleable from './Toggleable.jsx'
import { useRef } from 'react'
import blogService from '../services/blogs.js'
import { useUser } from '../contexts/UserContext.jsx'

const AppContent = () => {
  const blogFormRef = useRef()
  const [user, userDispatch] = useUser()

  const onLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    blogService.setToken(null)
    userDispatch({ type: 'LOGOUT_USER' })
  }

  const toggleVisibility = () => {
    blogFormRef.current.toggleVisibility()
  }

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        {user.name} logged in <button onClick={onLogout}>Log out</button>
      </div>

      <Toggleable buttonLabel="Create new blog" ref={blogFormRef}>
        <CreateBlogForm toggleVisibility={toggleVisibility}/>
      </Toggleable>

      <BlogList />
    </div>
  )
}

export default AppContent