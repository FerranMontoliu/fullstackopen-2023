import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import feedbackReducer from './reducers/feedbackReducer.js'

const store = createStore(feedbackReducer)

const App = () => {
  const storeState = store.getState()

  return (
    <div>
      <button onClick={() => {store.dispatch({ type: 'GOOD' })}}>good</button>
      <button onClick={() => {store.dispatch({ type: 'OK' })}}>ok</button>
      <button onClick={() => {store.dispatch({ type: 'BAD' })}}>bad</button>
      <button onClick={() => {store.dispatch({ type: 'ZERO' })}}>reset stats</button>

      <div>good {storeState.good}</div>
      <div>ok {storeState.ok}</div>
      <div>bad {storeState.bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
