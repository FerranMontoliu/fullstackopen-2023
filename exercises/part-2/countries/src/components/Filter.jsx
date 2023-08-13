const Filter = ({ filterQuery, onChange }) => {
    return (
        <p>
            Find countries{' '}
            <input
                type="text"
                name="filterQuery"
                value={filterQuery}
                onChange={onChange}
            />
        </p>
    )
}

export default Filter
