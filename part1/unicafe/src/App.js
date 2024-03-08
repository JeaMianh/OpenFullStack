import React, { useState } from 'react';

const Header = ({text}) => <h1>{text}</h1>
const Button = ({onClick, text}) => (
    <button onClick = {onClick}>
        {text}
    </button>
)
const Display = ({text, value}) => (
    <p>
        {text} {value}
    </p>
)
const Statistics = ({good, neutral, bad}) => {
    const total = good + neutral + bad
    const average = total !== 0 ? (good - bad) / total : 0
    const positivePercentage = total !== 0 ? good / total * 100 : 0

    if (total === 0) {
        return (
            <div>
                No feedback given
            </div>
        )
    }

    return (
        <div>
            <Display text = 'good' value = {good} />
            <Display text = 'neutral' value = {neutral} />
            <Display text = 'bad' value = {bad} />
            <Display text = 'all' value = {good + neutral + bad} />
            <Display text = 'average' value = {average} />
            <Display text = 'positive' value = {positivePercentage + '%'} />
        </div> 
    )
}
    

const App = (props) => {
    const [good, setGood] = useState(0) 
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGood = () => (
        setGood(good + 1)
    )
    const handleNeutral = () => (
        setNeutral(neutral + 1)
    )
    const handleBad = () => (
        setBad(bad + 1)
    )

    return (
        <div>
            <Header text = 'give feedback' />
            <Button onClick = {handleGood} text = 'good' />
            <Button onClick = {handleNeutral} text = 'neutral' />
            <Button onClick = {handleBad} text = 'bad' />
            <Header text = 'statistics' />
            {/* <Statistics good = {good} neutral={neutral} bad={bad} /> */}
            <Statistics {...{good, neutral, bad}} />
        </div>
    )
}

export default App