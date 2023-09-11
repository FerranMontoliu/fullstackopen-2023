import { useState } from 'react'

const NonExpandedBlog = ({ blog, handleView }) => (
  <div className="blog--not-expanded">
    {blog.title} {blog.author}

    <button className="blog--expand-btn" onClick={handleView}>View</button>
  </div>
)

const ExpandedBlog = ({ user, blog, handleHide, handleBlogDeleted, handleBlogLiked }) => (
  <div className="blog--expanded">
    <p className="blog--title-and-author">{blog.title} {blog.author}<button onClick={handleHide}>Hide</button></p>
    <a className="blog--url" href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a>
    <p className="blog--likes">Likes {blog.likes} <button className="blog--like-btn" onClick={() => handleBlogLiked(blog)}>Like</button></p>
    <p className="blog--user">{blog.user?.name}</p>

    {user.username && user.username === blog.user?.username && <button className="blog--remove-btn" onClick={() => handleBlogDeleted(blog)}>Remove</button>}
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
    <div style={blogStyle} className="blog--container">
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