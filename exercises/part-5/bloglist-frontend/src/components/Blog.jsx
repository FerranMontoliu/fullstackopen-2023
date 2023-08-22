import { useState } from 'react'

const NonExpandedBlog = ({ blog, handleView }) => (
  <div>
    {blog.title} {blog.author}

    <button onClick={handleView}>View</button>
  </div>
)

const ExpandedBlog = ({ user, blog, handleHide, handleBlogDeleted, handleBlogLiked }) => (
  <div>
    <p>{blog.title} {blog.author}<button onClick={handleHide}>Hide</button></p>
    <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a>
    <p>Likes {blog.likes} <button onClick={() => handleBlogLiked(blog)}>Like</button></p>
    <p>{blog.user?.name}</p>

    {user.username && user.username === blog.user?.username && <button onClick={() => handleBlogDeleted(blog)}>Remove</button>}
  </div>
)

const Blog = ({ user, blog, handleBlogLiked, handleBlogDeleted }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {isExpanded
        ? <ExpandedBlog
          user={user}
          blog={blog}
          handleHide={() => setIsExpanded(false)}
          handleBlogLiked={handleBlogLiked}
          handleBlogDeleted={handleBlogDeleted}
        />
        : <NonExpandedBlog
          blog={blog}
          handleView={() => setIsExpanded(true)}
        />
      }
    </div>
  )
}

export default Blog