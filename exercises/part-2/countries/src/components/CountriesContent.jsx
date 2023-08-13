import CountryList from './CountryList'
import CountryInfo from './CountryInfo'
import { useState } from 'react'

const TooManyMatches = () => {
    return <p>Too many matches, specify another filter</p>
}

const NoMatches = () => {
    return <p>No matches for this filter, specify another filter</p>
}

const CountriesContent = ({
    countries,
    selectedCountry,
    onCountrySelected,
}) => {
    const numCountries = countries?.length ?? 0

    if (selectedCountry) {
        return <CountryInfo country={selectedCountry} />
    }

    if (numCountries > 10) {
        return <TooManyMatches />
    }

    if (numCountries === 0) {
        return <NoMatches />
    }

    if (numCountries === 1) {
        return <CountryInfo country={countries[0]} />
    }

    return (
        <CountryList
            countries={countries}
            onCountrySelected={onCountrySelected}
        />
    )
}

export default CountriesContent
