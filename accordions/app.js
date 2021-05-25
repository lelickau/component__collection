document.addEventListener('DOMContentLoaded', () => {
    const featureLinkElems = document.querySelectorAll('.feature__link');
    const featureSubElems = document.querySelectorAll('.feature-sub');

    featureLinkElems.forEach((btn, index) => {
        btn.addEventListener('click', () => {

            if (btn.classList.contains('feature__link_active')) {
                btn.classList.remove('feature__link_active');
                featureSubElems[index].classList.add('hidden');
            } else {
                featureSubElems.forEach((featureSubElem) => {
                featureSubElem.classList.add('hidden');
                });
                featureLinkElems.forEach((featureLinkElem) => {
                    featureLinkElem.classList.remove('feature__link_active');
                });
                featureSubElems[index].classList.remove('hidden');
                btn.classList.add('feature__link_active');
            }
        })
    })
});