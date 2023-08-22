import Blog from './Blog.jsx'

const BlogList = ({ user, blogs, handleBlogLiked, handleBlogDeleted }) => {
  return(
    <div style={{ marginTop: '1rem' }}>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          user={user}
          blog={blog}
          handleBlogLiked={handleBlogLiked}
          handleBlogDeleted={handleBlogDeleted}
        />
      )}
    </div>
  )
}

export default BlogList