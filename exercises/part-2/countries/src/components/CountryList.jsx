const CountryListItem = ({ country, onCountrySelected }) => {
    const { name } = country

    return (
        <p>
            {name.common}{' '}
            <button
                onClick={() => {
                    onCountrySelected(country)
                }}>
                Show
            </button>
        </p>
    )
}

const CountryList = ({ countries, onCountrySelected }) => {
    return (
        <div>
            {countries.map(country => (
                <CountryListItem
                    key={country.name.official}
                    country={country}
                    onCountrySelected={onCountrySelected}
                />
            ))}
        </div>
    )
}

export default CountryList
