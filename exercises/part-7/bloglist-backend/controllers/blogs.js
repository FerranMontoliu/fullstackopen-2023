const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {
      username: 1,
      name: 1,
    })

  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog
    .findById(request.params.id)
    .populate('user', {
      username: 1,
      name: 1,
    })

  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const user = request.user

  const blogToSave = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: request.user.id,
  })

  const savedBlog = await blogToSave.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const blogToUpdate = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: request.body.user,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blogToUpdate,
    {
      new: true,
      runValidators: true,
      context: 'query',
    })

  response.json(updatedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const blogToRemove = await Blog.findById(request.params.id)

  if (!blogToRemove){
    response.status(404).send({ error: 'The blog you want to delete does not exist.' })
  }

  if (blogToRemove.user.toString() === user.id.toString()) {
    // Remove blog from the blogs collection
    await Blog.findByIdAndRemove(request.params.id)

    // Remove blog reference from the users collection
    user.blogs = user.blogs.filter(blog => blog.toString() !== request.params.id)
    await user.save()

    response.status(204).end()
  } else {
    response.status(401).send({ error: 'A user can only delete their own blogs.' })
  }
})

module.exports = blogsRouter