const initialState = ''

const reducer = (state = initialState, action) => {
  const { payload } = action

  switch (action.type) {
  case 'SET_FILTER':
    return payload

  default:
    return state
  }
}

export const filterChange = filter => {
  return {
    type: 'SET_FILTER',
    payload: filter,
  }
}

export default reducer