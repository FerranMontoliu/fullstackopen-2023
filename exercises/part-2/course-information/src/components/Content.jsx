import Part from './Part'

const Content = ({ course: { parts } }) => {
    return (
        <div>
            {parts.map((part, i) => (
                <Part key={i} name={part.name} numExercises={part.exercises} />
            ))}
        </div>
    )
}

export default Content
