import { Notification, rem } from '@mantine/core'
import { IconX, IconCheck } from '@tabler/icons-react'
import { useNotificationValue } from '../contexts/NotificationContext.jsx'

const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />
const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />

const AppNotification = () => {
  const notification = useNotificationValue()

  if (notification === null) {
    return null
  }

  const { message, type } = notification

  switch (type) {
  case 'error':
    return <Notification
      icon={xIcon}
      color="red"
      title={message}
      my="md"
      withCloseButton={false} />

  case 'info':
    return <Notification
      icon={checkIcon}
      color="teal"
      title={message}
      my="md"
      withCloseButton={false} />

  default:
    return null
  }
}

export default AppNotification
