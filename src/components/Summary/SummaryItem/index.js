import React from 'react'

function SummaryItem({ question, answer }) {
    return (
        <>
            <div>
                <h3>Question:</h3>
                <span>{question}</span>
            </div>
            <div>
                <h3>Answer:</h3>
                <span>{answer}</span>
            </div>
        </>
    )
}

export default SummaryItem
