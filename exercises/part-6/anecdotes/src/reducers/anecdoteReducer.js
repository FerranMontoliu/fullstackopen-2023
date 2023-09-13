import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const {
  appendAnecdote,
  setAnecdotes,
} = anecdoteSlice.actions

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdotes = getState().anecdotes
    const anecdoteToUpdate = anecdotes.find(anecdote => anecdote.id === id)

    const updatedAnecdote = await anecdoteService.updateAnecdote(id, {
      ...anecdoteToUpdate,
      votes: anecdoteToUpdate.votes + 1,
    })

    const updatedAnecdoteList = anecdotes.map(anecdote => anecdote.id === id ? updatedAnecdote : anecdote)

    dispatch(setAnecdotes(updatedAnecdoteList))
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch, getState) => {
    const anecdotes = await anecdoteService.getAllAnecdotes()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch, getState) => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer