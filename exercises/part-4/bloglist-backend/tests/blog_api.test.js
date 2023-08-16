const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')

const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (const blog of helper.initialBlogs) {
    await Blog(blog).save()
  }
})

test('all blogs are returned as json', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('all blogs have a field named id', async () => {
  const response = await api.get('/api/blogs')

  for (const blog of response.body) {
    expect(blog).toHaveProperty('id')
  }
})

test('a valid blog can be added', async () => {
  const blogToAdd = {
    title: 'This is a super duper title',
    author: 'Ferran',
    url: 'https://ferranmontoliu.info',
    likes: 9999,
  }

  await api
    .post('/api/blogs')
    .send(blogToAdd)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(contents).toContain(
    'This is a super duper title'
  )
})

test('a blog without likes is defaulted to 0', async () => {
  {
    const blogToAdd = {
      title: 'This is a super duper title',
      author: 'Ferran',
      url: 'https://ferranmontoliu.info',
    }

    const response = await api
      .post('/api/blogs')
      .send(blogToAdd)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveProperty('likes')
    expect(response.body.likes).toBe(0)
  }

  {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  }
})

test('blog without title is not added', async () => {
  const blogToAdd = {
    author: 'Ferran',
    url: 'https://ferranmontoliu.info',
  }

  await api
    .post('/api/blogs')
    .send(blogToAdd)
    .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog without url is not added', async () => {
  const blogToAdd = {
    title: 'This is a super duper title',
    author: 'Ferran',
  }

  await api
    .post('/api/blogs')
    .send(blogToAdd)
    .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})