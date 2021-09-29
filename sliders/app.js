document.addEventListener('DOMContentLoaded', () => {
    // начальная позиция
    let position = 0;
    // сколько показывать
    const slidesToShow = 2
    // сколько проскроливать
    const slidesToScroll = 2


    const container = document.querySelector('.slider-container')
    const track = document.querySelector('.slider-track')
    const items = document.querySelectorAll('.slider-item')
    const itemsCount = items.length
    const prev = document.querySelector('.btn-prev')
    const next = document.querySelector('.btn-next')

    const itemWidth = container.clientWidth / slidesToShow
    let movePosition = slidesToScroll * itemWidth

    const setPosition = () => {
        track.style.transform = `translate(${position}px)`
    }

    const checkBtn = () => {
        prev.disabled = position === 0
        next.disabled = position <= -(itemsCount - slidesToShow) * itemWidth
    }

    items.forEach(elem => {
        elem.style.minWidth = `${itemWidth}px`
    })

    prev.addEventListener('click', () => {
        const itemsRight = Math.abs(position) / itemWidth
        position += itemsRight >= slidesToScroll ? movePosition : itemsRight * itemWidth
        setPosition()
        checkBtn()
    })
    next.addEventListener('click', () => {
        const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth
        position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth
        setPosition()
        checkBtn()
    })

    checkBtn()

});