import { useEffect, useState } from 'react'
import weatherService from '../services/weather'

const LanguageList = ({ languages }) => {
    if (!languages) {
        return <p>No languages found</p>
    }

    return (
        <ul>
            {Object.values(languages).map(language => (
                <li key={language}>{language}</li>
            ))}
        </ul>
    )
}

const BasicInfo = ({ country }) => {
    const { capital, area } = country

    return (
        <>
            <p>Capital: {capital.join(', ')}</p>
            <p>Area: {area}</p>
        </>
    )
}

const Flag = ({ flags }) => {
    return <img src={flags.png} alt={flags.alt} />
}

const Weather = ({ country }) => {
    const { capital, capitalInfo } = country
    const [temperature, setTemperature] = useState(null)
    const [wind, setWind] = useState(null)
    const [weatherImageSrc, setWeatherImageSrc] = useState('')

    useEffect(() => {
        weatherService
            .getWeatherForCoordinates({
                lat: capitalInfo.latlng[0],
                lon: capitalInfo.latlng[1],
            })
            .then(response => {
                setTemperature(response.data.main.temp)
                setWind(response.data.wind.speed)
                setWeatherImageSrc(
                    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
                )
            })
            .catch(error => {
                console.error(error)
            })
    }, [])

    if (!capital) {
        return <p>No capital found for this country</p>
    }

    return (
        <div>
            {capital.map(city => (
                <div key={city}>
                    <h2>Weather in {city}</h2>
                    <p>Temperature: {temperature ?? '-'}</p>
                    <img src={weatherImageSrc} />
                    <p>Wind: {wind ?? '-'}</p>
                </div>
            ))}
        </div>
    )
}

const CountryInfo = ({ country }) => {
    const { name, languages, flags } = country

    return (
        <div>
            <h1>{name.common}</h1>
            <BasicInfo country={country} />

            <h3>Languages:</h3>
            <LanguageList languages={languages} />

            <Flag flags={flags} />

            <Weather country={country} />
        </div>
    )
}

export default CountryInfo
