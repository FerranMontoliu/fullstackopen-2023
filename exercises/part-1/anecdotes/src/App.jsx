import { useState } from 'react'
import Anecdote from './components/Anecdote'
import Button from './components/Button'

const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
]

const App = () => {
    const [selected, setSelected] = useState(0)
    const [scores, setScores] = useState(new Uint8Array(anecdotes.length))
    const mostVotedAnecdoteIndex = scores.indexOf(Math.max(...scores))

    const handleNextAnecdote = () => {
        const randomNumber = Math.floor(Math.random() * anecdotes.length)
        setSelected(randomNumber)
    }

    const handleVote = () => {
        const scores_ = [...scores]
        scores_[selected] += 1

        setScores(scores_)
    }

    return (
        <div>
            <Anecdote
                title="Anecdote of the day"
                anecdote={anecdotes[selected]}
                votes={scores[selected]}
            />
            <Button text="Vote" onClick={() => handleVote()} />
            <Button text="Next anecdote" onClick={() => handleNextAnecdote()} />

            <Anecdote
                title="Anecdote with most votes"
                anecdote={anecdotes[mostVotedAnecdoteIndex]}
                votes={scores[mostVotedAnecdoteIndex]}
            />
        </div>
    )
}

export default App
