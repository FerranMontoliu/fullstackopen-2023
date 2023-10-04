export const setError = (notificationDispatch, message) => {
  notificationDispatch({
    type: 'DISPLAY',
    payload: {
      message,
      type: 'error'
    },
  })

  setTimeout(() => {
    notificationDispatch({
      type: 'CLEAR',
    })
  }, 5_000)
}

export const setInfo = (notificationDispatch, message) => {
  notificationDispatch({
    type: 'DISPLAY',
    payload: {
      message,
      type: 'info'
    },
  })

  setTimeout(() => {
    notificationDispatch({
      type: 'CLEAR',
    })
  }, 5_000)
}