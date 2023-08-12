const Total = ({ course: { parts } }) => {
    const numExercises = parts.reduce((acc, part) => acc + part.exercises, 0)

    return (
        <p>
            <b>Total of {numExercises} exercises</b>
        </p>
    )
}

export default Total
