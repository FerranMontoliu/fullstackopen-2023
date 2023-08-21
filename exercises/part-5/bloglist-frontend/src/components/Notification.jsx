const Notification = ({ message, type }) => {
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

  return <div style={styles}>{message}</div>
}

export default Notification
