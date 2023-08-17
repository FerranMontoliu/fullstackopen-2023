const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const app = require('../app')

const api = supertest(app)
const User = require('../models/user')

afterAll(async () => {
  await mongoose.connection.close()
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({
      username: 'root',
      passwordHash,
    })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersBeforeInsert = await helper.usersInDb()

    const newUser = {
      username: 'ferran',
      name: 'Ferran',
      password: 'ferran',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAfterInsert = await helper.usersInDb()
    expect(usersAfterInsert).toHaveLength(usersBeforeInsert.length + 1)

    const usernames = usersAfterInsert.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersBeforeInsert = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Ferran',
      password: 'ferran',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAfterInsert = await helper.usersInDb()
    expect(usersAfterInsert).toEqual(usersBeforeInsert)
  })

  test('creation fails with proper statuscode and message if username is not given', async () => {
    const usersBeforeInsert = await helper.usersInDb()

    const newUser = {
      name: 'Ferran',
      password: 'ferran',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('User validation failed: username: Path `username` is required.')

    const usersAfterInsert = await helper.usersInDb()
    expect(usersAfterInsert).toEqual(usersBeforeInsert)
  })

  test('creation fails with proper statuscode and message if username is less than 3 characters long', async () => {
    const usersBeforeInsert = await helper.usersInDb()

    const newUser = {
      username: 'a',
      name: 'Ferran',
      password: 'ferran',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('User validation failed: username: Path `username` (`a`) is shorter than the minimum allowed length (3).')

    const usersAfterInsert = await helper.usersInDb()
    expect(usersAfterInsert).toEqual(usersBeforeInsert)
  })

  test('creation fails with proper statuscode and message if password is not given', async () => {
    const usersBeforeInsert = await helper.usersInDb()

    const newUser = {
      username: 'ferran',
      name: 'Ferran',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Password must be at least 3 characters long.')

    const usersAfterInsert = await helper.usersInDb()
    expect(usersAfterInsert).toEqual(usersBeforeInsert)
  })

  test('creation fails with proper statuscode and message if password is less than 3 characters long', async () => {
    const usersBeforeInsert = await helper.usersInDb()

    const newUser = {
      username: 'ferran',
      name: 'Ferran',
      password: 'f',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Password must be at least 3 characters long.')

    const usersAfterInsert = await helper.usersInDb()
    expect(usersAfterInsert).toEqual(usersBeforeInsert)
  })
})