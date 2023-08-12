import Part from './Part'

const Content = ({ course: { parts } }) => {
    return (
        <div>
            {parts.map(part => (
                <Part name={part.name} numExercises={part.exercises} />
            ))}
        </div>
    )
}

export default Content
