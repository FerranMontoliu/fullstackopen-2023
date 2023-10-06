import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)

  const sortedBlogs = [...response.data]
  sortedBlogs.sort((a, b) => b.likes - a.likes)

  return sortedBlogs
}

const getById = async (blogId) => {
  const response = await axios.get(`${baseUrl}/${blogId}`)

  return response.data
}

const createBlog = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateBlog = async ({ id, updatedData }) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedData)
  return response.data
}

const commentBlog = async ({ blogId, comment }) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, { comment })
  return response.data
}

const deleteBlog = id => {
  const config = {
    headers: { Authorization: token },
  }

  return axios.delete(`${baseUrl}/${id}`, config)
}

export default {
  getAll,
  getById,
  setToken,
  createBlog,
  updateBlog,
  commentBlog,
  deleteBlog,
}