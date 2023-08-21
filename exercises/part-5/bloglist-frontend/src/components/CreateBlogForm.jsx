import { useState } from 'react'

const CreateBlogForm = ({ handleBlogCreated }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const afterCreation = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const blog = { title, author, url }
    handleBlogCreated(blog, afterCreation)
  }

  return (
    <div>
      <h2>Create new blog</h2>

      <form onSubmit={onSubmit}>
        <div>
          Title:
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
          Author
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div>
          URL
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>

  )
}

export default CreateBlogForm