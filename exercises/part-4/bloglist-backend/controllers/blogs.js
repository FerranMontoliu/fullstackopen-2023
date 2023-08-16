const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})

  return response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blogToSave = new Blog({
    ...request.body
  })

  const savedBlog = await blogToSave.save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter