import CreateBlogForm from './CreateBlogForm.jsx'
import BlogList from './BlogList.jsx'

const AppContent = ({ user, blogs, handleLogout, handleBlogCreated }) => {

  const onLogout = (event) => {
    event.preventDefault()
    handleLogout()
  }

  return (
    <div>
      <h2>Blogs</h2>

      <div style={{ marginBottom: '1rem' }}>
        {user.name} logged in <button onClick={onLogout}>Log out</button>
      </div>

      <CreateBlogForm handleBlogCreated={handleBlogCreated} />

      <BlogList blogs={blogs}/>
    </div>
  )
}

export default AppContent