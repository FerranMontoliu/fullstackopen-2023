const Filter = ({ filterQuery, onChange }) => {
    return (
        <p>
            Filter shown with a:{' '}
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
