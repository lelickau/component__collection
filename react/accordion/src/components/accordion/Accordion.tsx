import React, { FC } from 'react'
import { AccordionItem } from './AccordionItem';

import './accordion.scss'

interface AccordionProps {
    content: any[];
}

export const Accordion: FC<AccordionProps> = ({content}) => {
    return (
        <div className="accordion">
            {content.map((item) => <AccordionItem key={item.label} hiddenText={item} />)}
        </div>
    )
}
