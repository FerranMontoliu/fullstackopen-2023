import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog.jsx'
import CreateBlogForm from '../components/CreateBlogForm.jsx'

const dummyBlog = {
  title: 'Mock title',
  author: 'Mock author',
  url: 'Mock url'
}

test('Form submission sends correct details', async () => {
  // Defining mock handlers
  const mockBlogCreatedHandler = jest.fn()

  // Rendering the blog form
  const { container } = render(<CreateBlogForm handleBlogCreated={mockBlogCreatedHandler}/>)

  // Setting up the user
  const user = userEvent.setup()

  // Filling the form
  await user.type(container.querySelector('.create-blog-form--title-input'), dummyBlog.title)
  await user.type(container.querySelector('.create-blog-form--author-input'), dummyBlog.author)
  await user.type(container.querySelector('.create-blog-form--url-input'), dummyBlog.url)

  // Submitting the form
  const submitFormBtn = container.querySelector('.create-blog-form--submit-btn')
  await user.click(submitFormBtn)

  // Checking that the values sent are the correct ones
  expect(mockBlogCreatedHandler.mock.calls).toHaveLength(1)
  expect(mockBlogCreatedHandler.mock.calls[0][0]).toEqual(dummyBlog)
})