import { useState } from 'react'

const PersonForm = ({ onSubmit }) => {
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')

    const afterSubmit = () => {
        setName('')
        setNumber('')
    }

    return (
        <form
            onSubmit={event => {
                event.preventDefault()
                onSubmit({ name, number }, afterSubmit)
            }}>
            <div>
                Name:{' '}
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={event => {
                        setName(event.target.value)
                    }}
                />
            </div>

            <div>
                Number:{' '}
                <input
                    type="text"
                    name="number"
                    value={number}
                    onChange={event => {
                        setNumber(event.target.value)
                    }}
                />
            </div>

            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

export default PersonForm
