// Main script
// const openMenu = (e) => {
//     e.preventDefault();
//     menuBtn.classList.toggle('menu__btn--active')
// }

// const menuBtn = document.querySelector('.menu__btn')
// menuBtn.addEventListener('click', openMenu)
//

// Variant 1

const openMenu1 = (e) => {
    e.preventDefault();
    menuBtn1.classList.toggle('menu__btn--active')
    menuNav1.classList.toggle('menu__nav1--active')
}

const menuBtn1 = document.querySelector('.menu__btn1')
const menuNav1 = document.querySelector('.menu__nav1')
menuBtn1.addEventListener('click', openMenu1)

// Variant 2

const openMenu2 = (e) => {
    e.preventDefault();
    menuBtn2.classList.toggle('menu__btn--active')
    menuNav2.classList.toggle('menu__nav2--active')
}

const menuBtn2 = document.querySelector('.menu__btn2')
const menuNav2 = document.querySelector('.menu__nav2')
menuBtn2.addEventListener('click', openMenu2)


// Variant 3

const openMenu3 = (e) => {
    e.preventDefault();
    menuBtn3.classList.toggle('menu__btn--active')
    menuNav3.classList.toggle('menu__nav3--active')
}

const menuBtn3 = document.querySelector('.menu__btn3')
const menuNav3 = document.querySelector('.menu__nav3')
menuBtn3.addEventListener('click', openMenu3)