document.addEventListener('DOMContentLoaded', () => {
    // начальная позиция
    let position = 0;
    // сколько показывать
    const slidesToShow = 2
    // сколько проскроливать
    const slidesToScroll = 2


    const container = document.querySelector('.slider-container')
    const track = document.querySelector('.slider-track')
    const slides = document.querySelectorAll('.slider-item')
    const slidesCount = slides.length
    const prevBtn = document.querySelector('.btn-prev')
    const nextBtn = document.querySelector('.btn-next')

    // ширина одного слайда, в зависимости от кол-ва показа слайдов
    const itemWidth = container.clientWidth / slidesToShow
    // длина скролла слайдов
    let movePosition = slidesToScroll * itemWidth

    /**
     * "Перелистывание" слайдов
     */
    const setPosition = () => track.style.transform = `translate(${position}px)`

    /**
     * Ф-ция блокировки кнопок
     */
    const checkBtn = () => {
        prevBtn.disabled = position === 0
        nextBtn.disabled = position <= -(slidesCount - slidesToShow) * itemWidth
    }

    // минимальная ширина каждого слайда
    slides.forEach(elem => elem.style.minWidth = `${itemWidth}px`)

    /**
     * Перелистывать назад или блокировать книпку, если нет слайдов
     */
    const toLeafPrev = () => {
        const slidesRight = Math.abs(position) / itemWidth
        position += slidesRight >= slidesToScroll ? movePosition : slidesRight * itemWidth
        setPosition()
        checkBtn()
    }

    /**
     * Перелистывать вперед или блокировать книпку, если нет слайдов
     */
    const toLeafNext = () => {
        const slidesLeft = slidesCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth
        position -= slidesLeft >= slidesToScroll ? movePosition : slidesLeft * itemWidth
        setPosition()
        checkBtn()
    }
    prevBtn.addEventListener('click', toLeafPrev)
    nextBtn.addEventListener('click', toLeafNext)

    checkBtn()

});