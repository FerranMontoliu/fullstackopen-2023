import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog.jsx'

const dummyUser = {
  username: 'root',
  name: 'Administrator',
  id: '64e4c1c96a1dd5b61785d2c3'
}

const dummyBlog = {
  id: '5a422ba71b54a676234d17fb',
  title: 'TDD harms architecture',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
  likes: 2,
  user: dummyUser,
}

const dummyBlogElement = (handleBlogDeleted = () => {}, handleBlogLiked= () => {}) => <Blog
  blog={dummyBlog}
  user={dummyUser}
  handleBlogDeleted={handleBlogDeleted}
  handleBlogLiked={handleBlogLiked} />

test('Renders title and author but does not render URL or likes by default', () => {
  // Rendering the blog element
  const { container } = render(dummyBlogElement())

  // Checking that title and author exist
  expect(container.querySelector('.blog--title-and-author')).toBeDefined()

  // Checking that url and likes do not exist
  expect(container.querySelector('.blog--url')).toBeNull()
  expect(container.querySelector('.blog--likes')).toBeNull()
})

test('Renders URL and likes when expanded', async () => {
  // Rendering the blog element
  const { container } = render(dummyBlogElement())

  // Setting up the user
  const user = userEvent.setup()

  // Expanding the blog element
  const expandBlogBtn = container.querySelector('.blog--expand-btn')
  await user.click(expandBlogBtn)

  // Checking that title, author, url and likes exist
  expect(container.querySelector('.blog--title-and-author')).toBeDefined()
  expect(container.querySelector('.blog--url')).toBeDefined()
  expect(container.querySelector('.blog--likes')).toBeDefined()
})

test('If the like button is clicked twice, the even is handled twice', async () => {
  // Defining mock handlers
  const mockBlogLikedHandler = jest.fn()

  // Rendering the blog element
  const { container } = render(dummyBlogElement(() => {}, mockBlogLikedHandler))

  // Setting up the user
  const user = userEvent.setup()

  // Expanding the blog element
  const expandBlogBtn = container.querySelector('.blog--expand-btn')
  await user.click(expandBlogBtn)

  // Liking the blog twice
  const likeBlogBtn = container.querySelector('.blog--like-btn')
  await user.click(likeBlogBtn)
  await user.click(likeBlogBtn)

  // Checking that the mock function was called twice
  expect(mockBlogLikedHandler.mock.calls).toHaveLength(2)
})