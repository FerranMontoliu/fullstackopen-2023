const Total = ({ course: { parts } }) => {
    const numExercises = parts.reduce((acc, part) => acc + part.exercises, 0)

    return <p>Number of exercises {numExercises}</p>
}

export default Total
