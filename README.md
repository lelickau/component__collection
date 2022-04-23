### accordion

При клике на секцию, будет открываться панель с контентом и закрывать ранее открытую секцию, а при втором клике обратно закрываться.

```html
<ul class="feature-list">
  <li class="feature__item">
        <!--   ЗАГОЛОВОК СЕКЦИИ 1 (активная)-->
    <button type="button" class="feature__link feature__link_active">
      <div class="feature-item-wrap">
        <span class="feature-item__title"> ЗАГОЛОВОК СЕКЦИИ </span>
      </div>
    </button>
        <!-- КОНТЕНТ (активный)-->
    <ul class="feature-sub">
      <li class="feature-sub__item">
        <span class="feature-sub__name">КОНТЕНТ </span>
        <span class="feature-sub__value">КОНТЕНТ </span>
      </li>
      <li class="feature-sub__item">
        <span class="feature-sub__name">КОНТЕНТ </span>
        <span class="feature-sub__value">КОНТЕНТ</span>
      </li>
      <li class="feature-sub__item">
        <span class="feature-sub__name">КОНТЕНТ</span>
        <span class="feature-sub__value">КОНТЕНТ</span>
      </li>
    </ul>
  </li>
  <li class="feature__item">
        <!--   ЗАГОЛОВОК СЕКЦИИ (скрытая)-->
    <button type="button" class="feature__link">
      <div class="feature-item-wrap">
        <span class="feature-item__title"> ЗАГОЛОВОК СЕКЦИИ </span>
      </div>
    </button>
        <!-- КОНТЕНТ (скрытый)-->
    <ul class="feature-sub hidden">
      <li class="feature-sub__item">
        <span class="feature-sub__name">КОНТЕНТ </span>
        <span class="feature-sub__value">КОНТЕНТ </span>
      </li>
      <li class="feature-sub__item">
        <span class="feature-sub__name">КОНТЕНТ </span>
        <span class="feature-sub__value">КОНТЕНТ</span>
      </li>
      <li class="feature-sub__item">
        <span class="feature-sub__name">КОНТЕНТ</span>
        <span class="feature-sub__value">КОНТЕНТ</span>
      </li>
    </ul>
  </li>
</ul>
```

Получаем все кнопки  и списки с контентом:
```js
const featureLinkElems = document.querySelectorAll('.feature__link');
const featureSubElems = document.querySelectorAll('.feature-sub');
```


Перебирам каждую кнопку, отслеживая событие "click".
Если при клике кнопка имеет активный класс "feature__link_active" - удаляем с этой кнопки активный класс "feature__link_active" и скрываем контент, добавив 'feature-sub' класс 'hidden'.
Иначе: каждому элементу контента с классом 'feature-sub' добавить класс 'hidden', у каждой кнопки с классом "feature__link" удалить класс "feature__link_active" (если он имеется), а кнопке на которой произошел "click", добавить класс активности "feature__link_active" и списку с контентной частью с аналогичным индексом что и у кнопки, удалить класс 'hidden':
```js
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
```
### menu

#### Анимированные мобильные меню
- Variant 1
![Variant 1](https://github.com/lelickau/component__collection/blob/main/js/menu/CSS_Burger_Menu_Btns/img/fromTopToBottom.png)
- Variant 2
![Variant 2](https://github.com/lelickau/component__collection/blob/main/js/menu/CSS_Burger_Menu_Btns/img/fromRightToLeft.png)
- Variant 3
![Variant 3](https://github.com/lelickau/component__collection/blob/main/js/menu/CSS_Burger_Menu_Btns/img/fromLeftToRight.png)