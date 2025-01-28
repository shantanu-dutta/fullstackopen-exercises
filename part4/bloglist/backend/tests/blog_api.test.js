import { after, beforeEach, describe, test } from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'
import supertest from 'supertest'

import app from '../app.js'

import Blog from '../models/blog.js'

import { blogsInDb, initialBlogs } from './test_helpers.js'

describe('blogs api', () => {

  let api

  beforeEach(() => {
    api = supertest(app)
  })

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
  })

  describe('reading blogs', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .send()
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('there are five blogs', async () => {
      const response = await api.get('/api/blogs')

      assert.strictEqual(response.body.length, initialBlogs.length)
    })

    test('first blog is about React patterns', async () => {
      const response = await api.get('/api/blogs')

      const contents = response.body.map(blog => blog.title)
      assert(contents.includes('React patterns'))
    })

    test('should set unique identifier in `id` field', async () => {
      const response = await api.get('/api/blogs')

      response.body.forEach(blog => {
        assert(blog.id)
      })
    })
  })

  describe('adding blog', () => {

    test('a valid blog can be added', async () => {
      const newBlog = {
        title: 'A new blog',
        author: 'John Doe',
        url: 'https://example.com/a-new-blog',
        likes: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await blogsInDb()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)

      const contents = blogsAtEnd.map(blog => blog.title)
      assert(contents.includes(newBlog.title))
    })

    test('should add a blog with zero likes if likes property is missing', async () => {
      const newBlogWithoutLikes = {
        title: 'A new blog',
        author: 'John Doe',
        url: 'https://example.com/a-new-blog',
      }

      const response = await api
        .post('/api/blogs')
        .send(newBlogWithoutLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.likes, 0)

      const blogsAtEnd = await blogsInDb()
      assert(blogsAtEnd.length, initialBlogs.length + 1)
    })

    test('should fail if the title property is missing', async () => {
      const blogsAtStart = await blogsInDb()

      const blogWithoutTitle = {
        author: 'John Doe',
        url: 'https://example.com/new-blog'
      }

      const response = await api
        .post('/api/blogs')
        .send(blogWithoutTitle)
        .expect(400)
      assert.deepStrictEqual(response.body, { error: 'title missing' })

      const blogsAtEnd = await blogsInDb()
      assert.deepStrictEqual(blogsAtStart, blogsAtEnd)
    })

    test.only('should fail if the url property is missing', async () => {
      const blogsAtStart = await blogsInDb()

      const blogWithoutUrl = {
        title: 'new blog',
        author: 'John Doe'
      }

      const response = await api
        .post('/api/blogs')
        .send(blogWithoutUrl)
        .expect(400)
      assert.deepStrictEqual(response.body, { error: 'url missing' })

      const blogsAtEnd = await blogsInDb()
      assert.deepStrictEqual(blogsAtStart, blogsAtEnd)
    })
  })

  after(async () => {
    await mongoose.connection.close()
  })
})

