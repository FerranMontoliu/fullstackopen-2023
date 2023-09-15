import { useEffect, useState } from 'react'
import countriesService from '../services/countries'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    countriesService
      .getCountryByName(name)
      .then((response) => {
        setCountry({
          found: true,
          data: {
            name: response.data.name.common,
            capital: response.data.capital[0],
            population: response.data.population,
            flag: response.data.flags.png,
          },
        })
      })
      .catch((error) => {
        setCountry({
          found: false,
          data: error,
        })
      })
  }, [name])

  return country
}

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
