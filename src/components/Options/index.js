import React, { useState } from 'react'
import './style.css'

function Options({ item, selectOption, data, activeIndex, summary }) {

    const [showOptionLabel, setShowOptionLabel] = useState('')

    return (
        <>
            <div className="options">
                <img src={item.image} title={item.label} onMouseEnter={() => setShowOptionLabel(item.label)}
                    onMouseLeave={() => setShowOptionLabel('')}
                    onClick={() => selectOption(data[activeIndex].introline, item.label)} />
                {
                    summary.map(row => (row.question === data[activeIndex].introline &&
                        row.answer === item.label) && showOptionLabel !== item.label && <span className='selectedLabel'>{item.label}</span>)
                }
                {
                    showOptionLabel === item.label && <span className='label'>{item.label}</span>
                }
            </div>
        </>
    )
}

export default Options
