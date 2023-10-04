import { useNotificationValue } from '../contexts/NotificationContext.jsx'

const Notification = () => {
  const notification = useNotificationValue()

  if (notification === null) {
    return null
  }

  const { message, type } = notification

  const baseStyles = {
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    marginBottom: '10px',
    padding: '10px',
  }

  const styles =
    type === 'error'
      ? {
        ...baseStyles,
        color: 'red',
      }
      : {
        ...baseStyles,
        color: 'green',
      }

  return (
    <div className={type} style={styles}>
      {message}
    </div>
  )
}

export default Notification
