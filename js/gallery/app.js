const carouselScripts = (carouselItem) => {

    const slides = carouselItem.querySelectorAll(`.carousel__item`)
    const buttonsNavigate = carouselItem.querySelectorAll(`.carousel__button`)

    const totalSlides = slides.length - 1
    let current = 0
    let prev = totalSlides
    let next = 1

    for (let i = 0; i < buttonsNavigate.length; i++) {
        buttonsNavigate[i].addEventListener("click", () => i === 0 ? setPrev() : setNext())
    }

    const setPrev = () => current > 0 ? setNum(current - 1) : setNum(totalSlides)

    const setNext = () => current < totalSlides ? setNum(current + 1) : setNum(0)

    const setNum = number => {
        current = number
        prev = current - 1
        next = current + 1

        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove("active")
            slides[i].classList.remove("prev")
            slides[i].classList.remove("next")
        }

        if (next === slides.length) {
            next = 0
        }

        if (prev === -1) {
            prev = totalSlides
        }

        slides[current].classList.add("active")
        slides[prev].classList.add("prev")
        slides[next].classList.add("next")
    }

    carouselItem.addEventListener('click', (e) => {
        e.preventDefault()
        const target = e.target
        const elemCarousel = target.classList.contains(`carousel`)
        const elemCloseBtn = target.classList.contains(`carousel__close-btn`)

        if (elemCarousel || elemCloseBtn) {
            carouselItem.classList.add(`carousel__hidden`)
        }
    })
}

// open carousel
const items = document.querySelectorAll(`.item`)
items.forEach(item => {
    const open = item.querySelector(`.carousel__open`)
    console.log(item)
    const carouselItem = item.querySelector('.carousel')
    open.addEventListener('click', (e) => {
        e.preventDefault()
        carouselItem.classList.remove(`carousel__hidden`)
    })
})

// start carousel
const carousel = document.querySelectorAll('.carousel')
for (let i = 0; i < carousel.length; i++) {
    carouselScripts(carousel[i])
}