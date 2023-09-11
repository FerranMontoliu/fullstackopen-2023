import PropTypes from 'prop-types'

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

  return <div className={type} style={styles}>{message}</div>
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default Notification
