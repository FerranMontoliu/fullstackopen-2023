import { Group, Paper } from '@mantine/core'
import { NavLink } from 'react-router-dom'
import LoggedInUserInfo from './LoggedInUserInfo.jsx'

const NavBar = () => {
  return (
    <Paper shadow="md" p="sm">
      <Group justify="space-between">
        <Group>
          <NavLink to="/">Blogs</NavLink>
          <NavLink to="/users">Users</NavLink>
        </Group>

        <LoggedInUserInfo />
      </Group>
    </Paper>
  )
}

export default NavBar
