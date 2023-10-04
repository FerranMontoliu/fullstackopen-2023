const _ = require('lodash')

/**
 * Returns a dummy value of 1.
 *
 * @param {Array} blogs - An array of blog objects.
 *
 * @returns {number} Always returns 1.
 */
const dummy = (blogs) => 1

/**
 * Calculates the total likes of all blogs.
 *
 * @param {Array} blogs - An array of blog objects.
 *
 * @returns {number|null} The total number of likes, or null if no blogs.
 */
const totalLikes = (blogs) => {
  if (!blogs) {
    return null
  }

  return blogs.reduce((acc, blog) => acc + blog.likes, 0)
}

/**
 * Returns the most favorited blog post.
 *
 * @param {Array} blogs - An array of blog objects.
 *
 * @returns {Object|null} An object containing the most favorited blog's title, author, and likes, or null if no blogs.
 */
const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null
  }

  const mostFavoritedBlog = blogs.reduce((currentMax, blog) => {
    return blog.likes > currentMax.likes ? blog : currentMax
  }, blogs[0])

  return {
    title: mostFavoritedBlog.title,
    author: mostFavoritedBlog.author,
    likes: mostFavoritedBlog.likes
  }
}

/**
 * Returns the author with the most blogs and the number of blogs they've written.
 *
 * @param {Array} blogs - An array of blog objects.
 *
 * @returns {Object|null} An object containing the author with the most blogs and the number of blogs, or null if no blogs.
 */
const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null
  }

  const blogsByAuthor = _.groupBy(blogs, 'author')
  const authorWithMostBlogs = _.maxBy(
    Object.keys(blogsByAuthor),
    author => blogsByAuthor[author].length)

  return {
    author: authorWithMostBlogs,
    blogs: blogsByAuthor[authorWithMostBlogs].length
  }
}

/**
 * Returns the author with the most likes and the total number of likes they've received.
 *
 * @param {Array} blogs - An array of blog objects.
 *
 * @returns {Object|null} An object containing the author with the most likes and their total likes, or null if no blogs.
 */
const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null
  }

  const likesByAuthor = _.reduce(
    blogs,
    (result, blog) => {
      if (!result[blog.author]) {
        result[blog.author] = 0
      }
      result[blog.author] += blog.likes
      return result
    },
    {}
  )
  const authorWithMostLikes = _.maxBy(
    Object.keys(likesByAuthor),
    author => likesByAuthor[author])

  return {
    author: authorWithMostLikes,
    likes: likesByAuthor[authorWithMostLikes]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}