import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import countriesService from './services/countries'
import CountriesContent from './components/CountriesContent'

const App = () => {
    const [countries, setCountries] = useState([])
    const [filterQuery, setFilterQuery] = useState('')
    const [selectedCountry, setSelectedCountry] = useState(null)

    useEffect(() => {
        countriesService
            .getAllCountries()
            .then(response => {
                setCountries(response.data)
            })
            .catch(error => {
                console.error(error)
            })
    }, [])

    return (
        <div>
            <Filter
                filterQuery={filterQuery}
                onChange={event => {
                    setSelectedCountry(null)
                    setFilterQuery(event.target.value)
                }}
            />

            <CountriesContent
                countries={countries.filter(country =>
                    country.name.common
                        .toLowerCase()
                        .includes(filterQuery.toLowerCase()),
                )}
                selectedCountry={selectedCountry}
                onCountrySelected={country => {
                    setSelectedCountry(country)
                }}
            />
        </div>
    )
}

export default App
