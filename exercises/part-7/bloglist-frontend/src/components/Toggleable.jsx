import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button, Stack } from '@mantine/core'

const Toggleable = forwardRef((props, refs) => {
  const [isVisible, setIsVisible] = useState(false)

  const hideWhenVisible = { display: isVisible ? 'none' : '' }
  const showWhenVisible = { display: isVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <Stack>
      <Stack style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </Stack>

      <Stack style={showWhenVisible}>
        {props.children}

        <Button onClick={toggleVisibility} variant="outline">Cancel</Button>
      </Stack>
    </Stack>
  )
})

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Toggleable.displayName = 'Toggleable'

export default Toggleable