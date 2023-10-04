import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'DISPLAY':
    return action.payload
  case 'CLEAR':
    return null
  default:
    return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  return notification
}

export const useNotificationDispatch = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  return dispatch
}

export default NotificationContext