const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')

const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

let token = null

beforeAll(async () => {
  // Delete all users
  await User.deleteMany({})

  // Insert initial user
  await new User(helper.initialUser).save()

  // Login to get the JWT token
  const loginResponse = await api
    .post('/api/login')
    .send({
      username: helper.initialUser.username,
      password: 'ferran',
    })

  // Update the global variable with the received token
  token = `Bearer ${loginResponse.body.token}`
})

beforeEach(async () => {
  // Delete all blogs
  await Blog.deleteMany({})

  // Insert initial blogs
  for (const blog of helper.initialBlogs) {
    await Blog(blog)
      .save()
  }
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe('when there is initially some blogs saved', () => {
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
})


describe('fetching a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsInDb = await helper.blogsInDb()

    const blogToFetch = blogsInDb[0]

    const response = await api
      .get(`/api/blogs/${blogToFetch.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toEqual(blogToFetch)
  })

  test('fails with status code 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('addition of a new blog', () => {
  test('a valid blog cannot be added without a token', async () => {
    const blogToAdd = {
      title: 'This is a super duper title',
      author: 'Ferran',
      url: 'https://ferranmontoliu.info',
      likes: 9999,
    }

    await api
      .post('/api/blogs')
      .send(blogToAdd)
      .expect(401)

    const blogsAfterInsert = await helper.blogsInDb()

    expect(blogsAfterInsert).toHaveLength(helper.initialBlogs.length)
  })

  test('a valid blog cannot be added with an invalid token', async () => {
    const blogToAdd = {
      title: 'This is a super duper title',
      author: 'Ferran',
      url: 'https://ferranmontoliu.info',
      likes: 9999,
    }

    await api
      .post('/api/blogs')
      .set('authorization', 'Bearer aaaaaaaaaaaa')
      .send(blogToAdd)
      .expect(401)

    const blogsAfterInsert = await helper.blogsInDb()

    expect(blogsAfterInsert).toHaveLength(helper.initialBlogs.length)
  })

  test('a valid blog can be added', async () => {
    const blogToAdd = {
      title: 'This is a super duper title',
      author: 'Ferran',
      url: 'https://ferranmontoliu.info',
      likes: 9999,
    }

    const savedBlogResponse = await api
      .post('/api/blogs')
      .set('authorization', token)
      .send(blogToAdd)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterInsert = await helper.blogsInDb()
    const blogTitlesAfterInsert = blogsAfterInsert.map(r => r.title)

    expect(blogsAfterInsert).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogTitlesAfterInsert).toContain('This is a super duper title')

    const usersAfterInsert = await helper.usersInDb()
    const user = usersAfterInsert.find((user) => user.id === helper.initialUser._id)
    expect(user.blogs.map(blog => blog.toString())).toContain(savedBlogResponse.body.id)
  })

  test('a blog without likes is defaulted to 0', async () => {
    const blogToAdd = {
      title: 'This is a super duper title',
      author: 'Ferran',
      url: 'https://ferranmontoliu.info',
    }

    const savedBlogResponse = await api
      .post('/api/blogs')
      .set('authorization', token)
      .send(blogToAdd)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(savedBlogResponse.body).toHaveProperty('likes')
    expect(savedBlogResponse.body.likes).toBe(0)

    const blogsAfterInsert = await helper.blogsInDb()
    expect(blogsAfterInsert).toHaveLength(helper.initialBlogs.length + 1)

    const usersAfterInsert = await helper.usersInDb()
    const user = usersAfterInsert.find((user) => user.id === helper.initialUser._id)
    expect(user.blogs.map(blog => blog.toString())).toContain(savedBlogResponse.body.id)

  })

  test('a blog without title is not added', async () => {
    const blogToAdd = {
      author: 'Ferran',
      url: 'https://ferranmontoliu.info',
    }

    await api
      .post('/api/blogs')
      .set('authorization', token)
      .send(blogToAdd)
      .expect(400)

    const blogsAfterInsert = await helper.blogsInDb()
    expect(blogsAfterInsert).toHaveLength(helper.initialBlogs.length)
  })

  test('a blog without url is not added', async () => {
    const blogToAdd = {
      title: 'This is a super duper title',
      author: 'Ferran',
    }

    await api
      .post('/api/blogs')
      .set('authorization', token)
      .send(blogToAdd)
      .expect(400)

    const blogsAfterInsert = await helper.blogsInDb()
    expect(blogsAfterInsert).toHaveLength(helper.initialBlogs.length)
  })
})

describe('update of a new blog', () => {
  test('a valid blog can be updated', async () => {
    const blogsBeforeUpdate = await helper.blogsInDb()
    const blogToUpdate = blogsBeforeUpdate[0]

    const updatedInfo = {
      title: 'This is a super duper title',
      author: 'Ferran',
      url: 'https://ferranmontoliu.info',
      likes: 9999,
    }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedInfo)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAfterUpdate = await helper.blogsInDb()
    const updatedBlogFromDb = blogsAfterUpdate.find(blog => blog.id === blogToUpdate.id)

    expect(blogsAfterUpdate).toHaveLength(helper.initialBlogs.length)
    expect(response.body).toEqual({
      ...updatedBlogFromDb,
      user: updatedBlogFromDb.user.id.toString(),
    })
  })

  test('likes from a valid blog can be updated', async () => {
    const blogsBeforeUpdate = await helper.blogsInDb()
    const blogToUpdate = blogsBeforeUpdate[0]

    const updatedInfo = {
      likes: 9999,
    }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedInfo)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAfterUpdate = await helper.blogsInDb()
    const updatedBlogFromDb = blogsAfterUpdate.find(blog => blog.id === blogToUpdate.id)

    expect(blogsAfterUpdate).toHaveLength(helper.initialBlogs.length)
    expect(response.body).toEqual({
      ...updatedBlogFromDb,
      user: updatedBlogFromDb.user.id.toString(),
    })
  })
})

describe('deletion of a blog', () => {
  test('a valid blog cannot be deleted without a token', async () => {
    const blogsBeforeDelete = await helper.blogsInDb()
    const blogToDelete = blogsBeforeDelete[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)

    const blogsAfterDelete = await helper.blogsInDb()
    const blogIdsInDb = blogsAfterDelete.map(r => r.id)

    expect(blogsAfterDelete).toHaveLength(helper.initialBlogs.length)
    expect(blogIdsInDb).toContain(blogToDelete.id)

    const usersAfterDelete = await helper.usersInDb()
    const user = usersAfterDelete.find((user) => user.id === helper.initialUser._id)
    expect(user.blogs.map(blog => blog.toString())).toContain(blogToDelete.id)
  })

  test('a valid blog cannot be deleted with an invalid token', async () => {
    const blogsBeforeDelete = await helper.blogsInDb()
    const blogToDelete = blogsBeforeDelete[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('authorization', 'Bearer aaaaaaaaaaaa')
      .expect(401)

    const blogsAfterDelete = await helper.blogsInDb()
    const blogIdsInDb = blogsAfterDelete.map(r => r.id)

    expect(blogsAfterDelete).toHaveLength(helper.initialBlogs.length)
    expect(blogIdsInDb).toContain(blogToDelete.id)

    const usersAfterDelete = await helper.usersInDb()
    const user = usersAfterDelete.find((user) => user.id === helper.initialUser._id)
    expect(user.blogs.map(blog => blog.toString())).toContain(blogToDelete.id)
  })

  test('succeeds with status code 204 if id is valid', async () => {
    const blogsBeforeDelete = await helper.blogsInDb()
    const blogToDelete = blogsBeforeDelete[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('authorization', token)
      .expect(204)

    const blogsAfterDelete = await helper.blogsInDb()
    const blogIdsInDb = blogsAfterDelete.map(r => r.id)

    expect(blogsAfterDelete).toHaveLength(helper.initialBlogs.length - 1)
    expect(blogIdsInDb).not.toContain(blogToDelete.id)

    const usersAfterDelete = await helper.usersInDb()
    const user = usersAfterDelete.find((user) => user.id === helper.initialUser._id)
    expect(user.blogs.map(blog => blog.toString())).not.toContain(blogToDelete.id)
  })
})