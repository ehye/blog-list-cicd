const { describe, test, before, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const api = supertest(app)

let token

before(async () => {
  await User.deleteMany({})
  const user = helper.initialUsers[0]
  await api.post('/api/users').send(user).expect(201)
  const response = await api.post('/api/login').send(user)
  token = `Bearer ${response.body.token}`
})

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  describe('viewing blogs', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
      const response = await api.get('/api/blogs')
      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })
  })

  describe('addition of a new blog', () => {
    test('post is saved correctly to the database', async () => {
      const blog = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
      }
      var res = await api
        .post('/api/blogs')
        .send(blog)
        .set('Authorization', token)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs/' + res.body.id)
      const jObj = response.body
      assert.equal(jObj.title, blog.title)
      assert.equal(jObj.author, blog.author)
      assert.equal(jObj.url, blog.url)
      assert.equal(jObj.likes, blog.likes)
    })

    test('if the likes property is missing, it will default to the value 0', async () => {
      const blog = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
      }
      var res = await api
        .post('/api/blogs')
        .send(blog)
        .set('Authorization', token)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs/' + res.body.id)
      const jObj = response.body
      assert.equal(jObj.likes, 0)
    })

    test('if the title or url properties are missing, responds the status code 400', async () => {
      const blog = { author: 'Michael Chan' }
      await api.post('/api/blogs').send(blog).set('Authorization', token).expect(400)
    })

    test('fails with 401 Unauthorized if a token is not provided', async () => {
      const blog = { author: 'Michael Chan' }
      await api.post('/api/blogs').send(blog).expect(401)
    })
  })

  describe('deletion of a blog', () => {
    let id
    beforeEach(async () => {
      await Blog.deleteMany({})
      const response = await api.post('/api/blogs').set('Authorization', token).send(helper.initialBlogs[0])
      await api.post('/api/blogs').set('Authorization', token).send(helper.initialBlogs[1])
      id = response.body.id
    })

    test('succeeds with status code 204 if id is valid', async () => {
      await api.delete(`/api/blogs/${id}`).set('Authorization', token).expect(204)
    })
  })

  describe('update of a blog', () => {
    test('return updated object as json', async () => {
      const res = await api.get('/api/blogs').set('Authorization', token).expect(200)
      const blogToUpdate = res.body[0]
      blogToUpdate.likes = 2077
      const response = await api.put(`/api/blogs/${blogToUpdate.id}`).set('Authorization', token).send(blogToUpdate)

      const blogAfterUpdate = await api
        .get('/api/blogs/' + response.body.id)
        .set('Authorization', token)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.equal(blogAfterUpdate.body.likes, 2077)
    })
  })
})

describe('when there is initially one user in db', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.equal(Array.from(usersAtEnd).length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert.ok(Array.from(usernames).includes(newUser.username))
  })

  test('invalid users are not created', async () => {
    const newUser = {
      username: '',
      password: '',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

after(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  await mongoose.connection.close()
})
