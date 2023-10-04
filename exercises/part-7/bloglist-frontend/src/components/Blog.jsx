import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs.js'
import { setError, setInfo } from '../utils/notifications.js'
import { useNotificationDispatch } from '../contexts/NotificationContext.jsx'

const NonExpandedBlog = ({ blog, handleView }) => (
  <div className="blog--not-expanded">
    {blog.title} {blog.author}

    <button className="blog--expand-btn" onClick={handleView}>View</button>
  </div>
)

const ExpandedBlog = ({ user, blog, handleHide }) => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const updateBlogMutation = useMutation({
    mutationFn: blogService.updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setInfo(notificationDispatch, `You liked the blog '${blog.title}' by '${blog.author}'.`)
    },
    onError: (error) => {
      setError(notificationDispatch, error.response.data.error)
    }
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setInfo(notificationDispatch, `You deleted the blog '${blog.title}' by '${blog.author}'.`)
    },
    onError: (error) => {
      setError(notificationDispatch, error.response.data.error)
    }
  })

  const handleBlogLiked = blog => {
    const updatedData = {
      user: blog.user?.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }

    updateBlogMutation.mutate({ id: blog.id, updatedData })
  }

  const handleBlogDeleted = blog => {
    const { id, title, author } = blog

    const isDeleteConfirmed = window.confirm(`Remove blog '${title}' by '${author}'?`)
    if (!isDeleteConfirmed) {
      return
    }

    deleteBlogMutation.mutate(id)
  }

  return (
    <div className="blog--expanded">
      <p className="blog--title-and-author">{blog.title} {blog.author}
        <button onClick={handleHide}>Hide</button>
      </p>
      <a className="blog--url" href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a>
      <p className="blog--likes">Likes {blog.likes}
        <button className="blog--like-btn" onClick={() => handleBlogLiked(blog)}>Like</button>
      </p>
      <p className="blog--user">{blog.user?.name}</p>

      {user.username && user.username === blog.user?.username &&
            <button className="blog--remove-btn" onClick={() => handleBlogDeleted(blog)}>Remove</button>}
    </div>
  )
}

const Blog = ({ user, blog }) => {
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