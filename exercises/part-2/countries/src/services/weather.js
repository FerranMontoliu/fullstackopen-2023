import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY

const getWeatherForCoordinates = ({ lat, lon }) => {
    return axios.get(baseUrl, {
        params: {
            lat,
            lon,
            appid: API_KEY,
            units: 'metric',
        },
    })
}

export default {
    getWeatherForCoordinates,
}
