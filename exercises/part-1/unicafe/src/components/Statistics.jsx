import StatisticLine from './StatisticLine'

const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad
    const average = (good - bad) / total
    const positive = (100 * good) / total

    return (
        <div>
            <h2>Statistics</h2>
            {!total && !neutral && !bad ? (
                <p>No feedback given</p>
            ) : (
                <table>
                    <tbody>
                        <StatisticLine text="Good" value={good} />
                        <StatisticLine text="Neutral" value={neutral} />
                        <StatisticLine text="Bad" value={bad} />
                        <StatisticLine text="Average" value={average} />
                        <StatisticLine
                            text="Positive"
                            value={`${positive} %`}
                        />
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Statistics
