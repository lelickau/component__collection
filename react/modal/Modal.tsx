import React, { FC, MouseEvent, ReactNode } from 'react';

interface ModalProps {
    active: boolean;
    setActive: (active: boolean) => any;
    children: ReactNode;
}

const Modal: FC<ModalProps> = ({active, setActive, children}) => {
const closeModal = () => setActive(false)
    return (
        <div
            onClick={closeModal}
            style={{
                height: '100vh',
                width: '100vw',
                backgroundColor: 'rgba(0,0,0,0.4)',
                position: 'fixed',
                top: 0,
                left: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: `${active ? 1 : 0}`,
                pointerEvents: `${active ? 'auto' : 'none'}`,
                transition: '.5s',
            }}
        >
            <div
                onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
                style={{
                    padding: 20,
                    borderRadius: 12,
                    background: '#fff',
                    width: 600,
                    transform: `${active ? 'scale(1)' : 'scale(0.5)'}`,
                    transition: 'all .4s',
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;