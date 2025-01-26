import groupBy from 'lodash/groupBy.js'
import maxBy from 'lodash/maxBy.js'
import sumBy from 'lodash/sumBy.js'

const dummy = () => {
  return 1
}

const totalLikes = blogs => {
  return sumBy(blogs, blog => blog.likes)
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) {
    return null
  }

  return maxBy(blogs, blog => blog.likes)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const blogsByAuthor = groupBy(blogs, blog => blog.author)
  const authorsBlogCount = Object.entries(blogsByAuthor).map(([author, blogs]) => {
    return {
      author,
      blogs: blogs.length
    }
  })
  return maxBy(authorsBlogCount, authorBlogs => authorBlogs.blogs)
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const blogsByAuthor = groupBy(blogs, blog => blog.author)
  const authorsLikesCount = Object.entries(blogsByAuthor).map(([author, blogs]) => {
    return {
      author,
      likes: sumBy(blogs, blog => blog.likes)
    }
  })
  return maxBy(authorsLikesCount, authorLikes => authorLikes.likes)
}

export default {
  dummy,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  totalLikes
}
