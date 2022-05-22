import React, { FC } from 'react'
import { Accordion } from './Accordion'

import './accordion.scss'

const AccordionApp: FC = () => {

    const accordionContent = [{
        label: 'Button name 1',
        value: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt cupiditate sunt quam dolor sit fuga quisquam aperiam laborum quasi pariatur!'
    },
    {
        label: 'Button name 2',
        value: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, adipisci!'
    },
    {
        label: 'Button name 3',
        value: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt cupiditate sunt quam dolor sit fuga quisquam aperiam laborum quasi pariatur!'
    },
    {
        label: 'Button name 4',
        value: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, adipisci!'
    }]

    return (
        <div>
            <Accordion content={accordionContent} />
        </div>
    )
}

export default AccordionApp