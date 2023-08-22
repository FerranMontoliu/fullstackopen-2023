import CreateBlogForm from './CreateBlogForm.jsx'
import BlogList from './BlogList.jsx'
import Toggleable from './Toggleable.jsx'

const AppContent = ({
  user,
  blogs,
  handleLogout,
  handleBlogCreated,
  handleBlogLiked,
  handleBlogDeleted,
  blogFormRef
}) => {

  const onLogout = (event) => {
    event.preventDefault()
    handleLogout()
  }

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        {user.name} logged in <button onClick={onLogout}>Log out</button>
      </div>

      <Toggleable buttonLabel="Create new blog" ref={blogFormRef}>
        <CreateBlogForm handleBlogCreated={handleBlogCreated} />
      </Toggleable>

      <BlogList
        user={user}
        blogs={blogs}
        handleBlogLiked={handleBlogLiked}
        handleBlogDeleted={handleBlogDeleted}
      />
    </div>
  )
}

export default AppContent