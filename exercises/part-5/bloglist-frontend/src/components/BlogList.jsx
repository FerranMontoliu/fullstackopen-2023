import Blog from './Blog.jsx'

const BlogList = ({ blogs }) => {
  return(
    <div style={{ marginTop: '1rem' }}>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
    </div>
  )
}

export default BlogList