import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import Blog from './Blog.jsx'

const BlogList = () => {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  if (result.isLoading) {
    return <div>Loading data...</div>
  }

  if (result.isError) {
    return <div>Blog service not available due to problems in server</div>
  }

  const blogs = result.data

  return (
    <div className="blog-list--container" style={{ marginTop: '1rem' }}>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  )
}

export default BlogList