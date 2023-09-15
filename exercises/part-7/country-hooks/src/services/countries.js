import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getCountryByName = (name) => {
  return axios.get(`${baseUrl}/name/${name}`)
}

export default {
  getCountryByName,
}
