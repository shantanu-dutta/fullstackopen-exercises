import { Router } from 'express'
import Blog from '../models/blog.js'

const blogsRouter = Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  return response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body

  if (!title) {
    return response.status(400).json({
      error: 'title missing'
    })
  }

  if (!url) {
    return response.status(400).json({
      error: 'url missing'
    })
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes ?? 0
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const blog = {
    title,
    author,
    url,
    likes
  }

  const updatedBlog = await Blog
    .findByIdAndUpdate(
      request.params.id, blog,
      { new: true, runValidators: true, context: 'query' }
    )
  response.json(updatedBlog)
})

export default blogsRouter
