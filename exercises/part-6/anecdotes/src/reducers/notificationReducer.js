import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    displayNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return initialState
    }
  }
})

export const { displayNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, timeout) => {
  return async (dispatch, getState) => {
    // Set notification
    dispatch(displayNotification(message))

    // Clear notification after timeout
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout * 1000)
  }
}

export default notificationSlice.reducer