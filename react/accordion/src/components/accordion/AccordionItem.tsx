import React, { FC, useState } from 'react'

import './accordion.scss'

interface AccordionItemProps {
    hiddenText: any;
}

export const AccordionItem: FC<AccordionItemProps> = ({hiddenText}) => {
    const [visibility, setVisibility] = useState(false)

    const handleToggleVisibility = () => {
        setVisibility(!visibility)
    }

    const activeStatus = visibility ? 'active' : ''
    const changeIcoButton = visibility ? 'accordion-item__ico--active' : ''

    return (
        <div className="accordion-item">
            <button
                className="accordion-item__button"
                onClick={ handleToggleVisibility }
            >
                <span className={ `accordion-item__ico ${changeIcoButton}` }></span>
                <span className="accordion-item__button-text">{hiddenText.label}</span>
            </button>
            <p className={`accordion-item__content ${activeStatus}`}>
                { hiddenText.value }
            </p>
        </div>
    )
}