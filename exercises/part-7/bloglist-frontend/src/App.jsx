import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm.jsx'
import BlogsScreen from './screens/BlogsScreen.jsx'
import AppNotification from './components/AppNotification.jsx'
import Toggleable from './components/Toggleable.jsx'
import { useUser } from './contexts/UserContext.jsx'
import UsersScreen from './screens/UsersScreen.jsx'
import UserScreen from './screens/UserScreen.jsx'
import BlogScreen from './screens/BlogScreen.jsx'
import { Container, Stack } from '@mantine/core'
import NavBar from './components/NavBar.jsx'

const App = () => {
  const [user, userDispatch] = useUser()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'SET_USER', payload: user })
      blogService.setToken(user.token)
    }
  }, [])

  if (user === null) {
    return (
      <Container pt="xl">
        <AppNotification />

        <Toggleable buttonLabel="Log in">
          <LoginForm />
        </Toggleable>
      </Container>
    )
  }

  return (
    <Container pt="xl">
      <Stack>
        <NavBar />

        <AppNotification />

        <Routes>
          <Route path="/users/:userId" element={<UserScreen />} />
          <Route path="/users" element={<UsersScreen />} />
          <Route path="/blogs/:blogId" element={<BlogScreen />} />
          <Route path="/" element={<BlogsScreen />} />
        </Routes>
      </Stack>
    </Container>
  )
}

export default App
