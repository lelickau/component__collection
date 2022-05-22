import React, { DragEvent, FC, useState } from 'react';

import './style.css'
import img1 from './img/flamingo.png'
import img2 from './img/crocodile.png'
import img3 from './img/giraffe.png'
import img4 from './img/rabbit.png'

interface Card {
    id: number;
    order: number;
    text: string;
    imgSrc: string;
}

const DragNDrop: FC= () => {

    const [cardList, setCardList] = useState<Card[]>([
        {id: 1, order: 1, text: 'Card 1', imgSrc: img1},
        {id: 2, order: 2, text: 'Card 2', imgSrc: img2},
        {id: 3, order: 3, text: 'Card 3', imgSrc: img3},
        {id: 4, order: 4, text: 'Card 4', imgSrc: img4},
    ])

    const [currentCard, setCurrentCurd] = useState<null | Card>(null)

    const dragStartHandler = (e: DragEvent<HTMLDivElement>, card: Card) => {
        setCurrentCurd(card)
    }

    const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement
        target.style.background = '#82589F'
    }

    const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {

    }

    const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const target = e.target as HTMLDivElement
        target.style.background = '#ea8685'
    }

    const dropHandler = (e: DragEvent<HTMLDivElement>, card: Card) => {
        e.preventDefault()
        setCardList(cardList.map((c: Card) => {
            if (c.id === card.id) {
                return {...c, order: currentCard!.order}
            }

            if (c.id === currentCard?.id) {
                return {...c, order: card.order}
            }
            return c
        }))
        const target = e.target as HTMLDivElement
        target.style.background = '#82589F'
    }

    const sortCards = (a: Card, b: Card) => {
        if (a.order > b.order) {
            return 1
        } else {
            return -1
        }
    }

    return (
        <section className="container drop-content">
            {
                cardList.sort(sortCards).map(card =>
                    <div
                        draggable={true}
                    // onDragStart - сработает в момент взятия карточки
                        onDragStart={(e: DragEvent<HTMLDivElement>) => dragStartHandler(e, card)}
                    // onDragLeave - сработает в момент выхода за пределы другой карточки
                        onDragLeave={(e: DragEvent<HTMLDivElement>) => dragLeaveHandler(e)}
                    // onDragEnd - отпустить перемещение
                        onDragEnd={(e: DragEvent<HTMLDivElement>) => dragEndHandler(e)}
                    // onDragOver - если находишся над другим объектом
                        onDragOver={(e: DragEvent<HTMLDivElement>) => dragOverHandler(e)}
                    // onDrop - отпустить карточку и сделать действие
                        onDrop={(e: DragEvent<HTMLDivElement>) => dropHandler(e, card)}
                        key={card.id}
                        className="card-item"
                    >
                        <img className='card-img' src={card.imgSrc} alt="card.text" />
                    </div>
                )
            }
        </section>
    )
}

export default DragNDrop