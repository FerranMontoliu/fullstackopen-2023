import CreateBlogForm from '../components/CreateBlogForm.jsx'
import BlogList from '../components/BlogList.jsx'
import Toggleable from '../components/Toggleable.jsx'
import { useRef } from 'react'
import { Stack, Title } from '@mantine/core'

const BlogsScreen = () => {
  const blogFormRef = useRef()

  const toggleVisibility = () => {
    blogFormRef.current.toggleVisibility()
  }

  return (
    <Stack>
      <Title order={2} mb="md">Blogs</Title>

      <Toggleable buttonLabel="Create new blog" ref={blogFormRef}>
        <CreateBlogForm toggleVisibility={toggleVisibility} />
      </Toggleable>

      <BlogList />
    </Stack>
  )
}

export default BlogsScreen