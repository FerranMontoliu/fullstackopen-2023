import CreateBlogForm from './CreateBlogForm.jsx'
import BlogList from './BlogList.jsx'
import Toggleable from './Toggleable.jsx'
import { useRef } from 'react'

const AppContent = ({
  user,
  handleLogout,
}) => {
  const blogFormRef = useRef()

  const onLogout = (event) => {
    event.preventDefault()
    handleLogout()
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

      <BlogList user={user} />
    </div>
  )
}

export default AppContent