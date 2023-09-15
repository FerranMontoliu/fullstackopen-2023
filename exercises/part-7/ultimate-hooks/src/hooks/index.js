import { useEffect, useState } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const create = (resource) => {
    axios
      .post(baseUrl, resource)
      .then((response) => {
        setResources( [...resources, response.data])
      })
  }

  const getAll = () => {
    axios
      .get(baseUrl)
      .then((response) => {
        setResources(response.data)
      })
  }

  useEffect(() => {
    getAll()
  }, [])

  const service = {
    create,
    getAll,
  }

  return [
    resources,
    service,
  ]
}