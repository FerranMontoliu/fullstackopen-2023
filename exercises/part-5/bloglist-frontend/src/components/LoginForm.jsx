import { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const afterLogin = () => {
    setUsername('')
    setPassword('')
  }

  const onSubmit = (event) => {
    event.preventDefault()
    handleLogin(username, password, afterLogin)
  }

  return (
    <div>
      <h2>Log in to application</h2>

      <form onSubmit={onSubmit}>
        <div>
          Username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          Password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <button type="submit">login</button>
      </form>
    </div>

  )
}

export default LoginForm