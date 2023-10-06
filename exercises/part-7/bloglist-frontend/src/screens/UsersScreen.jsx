import { useQuery } from '@tanstack/react-query'
import userService from '../services/users.js'
import { Loader, Stack, Text, Title, Table } from '@mantine/core'

const UsersTable = ({ users }) => {
  const rows = users.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td>{user.name}</Table.Td>
      <Table.Td>{user.blogs?.length ?? 0}</Table.Td>
    </Table.Tr>
  ))

  return (
    <Table my="md">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Blogs created</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  )
}

const UsersScreen = () => {
  const result = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  })

  if (result.isLoading) {
    return <Loader />
  }

  if (result.isError) {
    return <Text>User service not available due to problems in server</Text>
  }

  const users = result.data

  console.log(users)

  return (
    <Stack>
      <Title order={2}>Users</Title>

      <UsersTable users={users} />
    </Stack>
  )
}

export default UsersScreen