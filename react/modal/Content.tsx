import React, { FC, useState } from 'react'
import Modal from './Modal'

import './style.css'

const Content: FC = () => {
    const [modalActive, setModalActive] = useState(false)

    const openModal = (active: boolean) => {
        console.log(modalActive);
        setModalActive(active)
    }

    return (
    <section className='container'>
        <article className='content'>
            <button className='open-btn' onClick={() => openModal(true)}>Open Modal</button>
        </article>
        <Modal active={modalActive} setActive={openModal}>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis quos facilis, reprehenderit ab aspernatur sequi.</p>
        </Modal>
    </section>
    )
}

export default Content