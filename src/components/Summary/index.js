import React from 'react'
import SummaryItem from './SummaryItem'
import './style.css'

function Summary({ summary }) {
    return (
        <div className='summary'>
            <ul>
                {summary.map(item => (
                    <li>
                        <SummaryItem question={item.question} answer={item.answer} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Summary
