import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAllAnecdotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async (content) => {
  const newAnecdote = {
    content,
    votes: 0,
  }

  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

const updateAnecdote = async (id, updatedAnecdote) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
  return response.data
}

export default { getAllAnecdotes, createAnecdote, updateAnecdote }