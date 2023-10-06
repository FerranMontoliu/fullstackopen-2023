import { createContext, useContext, useReducer } from 'react'

const userReducer = (state, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.payload
  case 'LOGOUT_USER':
    return null
  default:
    return state
  }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null)

  return (
    <UserContext.Provider value={[user, userDispatch] }>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const [user, dispatch] = useContext(UserContext)
  return user
}

export const useUserDispatch = () => {
  const [user, dispatch] = useContext(UserContext)
  return dispatch
}

export const useUser = () => {
  const [user, dispatch] = useContext(UserContext)
  return [user, dispatch]
}

export default UserContext