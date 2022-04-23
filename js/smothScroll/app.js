document.addEventListener('DOMContentLoaded', () => {
    const SPEEDSCROLL = 0.5;

    const scrolled = e => {
        
        const target = e.target;

        if (target.matches('a[href^="#"]')) {
            e.preventDefault();
            let start = 0; //стартовое значение
            const pageY = window.pageYOffset;

            //const hash = target.getAttribute('href');
            // const hash = target.href.replace(/[^#]*(.*)/, '$1');   второй способ получения значения href
            //const elem = document.querySelector(hash);

            if (target.getAttribute('href') === "#") return;
            //получение координат секции если нет фиксированного header
            const coordinateElem = document.querySelector(target.getAttribute('href')).getBoundingClientRect().top;
            // если есть фиксированный header
            //const coordinateElem = document.querySelector(target.getAttribute('href')).getBoundingClientRect().top - 80;  80 - это высота header

            const step = time => {
                if (!start) start = time;
                const progress = time - start;

                const r = (coordinateElem < 0 ?
                    Math.max(pageY - progress / SPEEDSCROLL, pageY + coordinateElem) :
                    Math.min(pageY + progress / SPEEDSCROLL, pageY + coordinateElem));

                window.scrollTo(0, r);
                if (r < pageY + coordinateElem) requestAnimationFrame(step);
            }

            requestAnimationFrame(step);
        }
    }

    document.body.addEventListener('click', scrolled);
});