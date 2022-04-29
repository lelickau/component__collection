document.addEventListener('DOMContentLoaded', () => {

    const monthArr = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

    //сегодня дата в ms
    const getTimeToday = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime();

    function Calendar(id, year, month) {
        // последнее число месяца (30)
        let Dlast = new Date(year, month + 1, 0).getDate(),
        // последнее число мес с полными данными (Thu Sep 30 2021 00:00:00 GMT+0200 (Восточная Европа, стандартное время))
            D = new Date(year, month, Dlast),
            // день недели последн дня мес (от-до: 1 2 3 4 5 6 0 )
            DNlast = new Date(D.getFullYear(), D.getMonth(), Dlast).getDay(),
            // день недели первого дня мес (от-до: 1 2 3 4 5 6 0 )
            DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay(),
            calendar = '<tr>';

            // пустые клетки начала календаря
        if (DNfirst != 0) {
            for (let i = 1; i < DNfirst; i++) calendar += '<td>';
        } else {
            for (let i = 0; i < 6; i++) calendar += '<td>';
        }

        for (let i = 1; i <= Dlast; i++) {

            if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
                // создание today
                calendar += `<td class="today future__day" data-date='${new Date(D.getFullYear(), D.getMonth(), i).getTime()}'>` + i;
            } else {
                // создание остальных чисел лесяца
                calendar += `<td data-date='${new Date(D.getFullYear(), D.getMonth(), i).getTime()}'>` + i;
            }
            // новая строка таблицы
            if (new Date(D.getFullYear(), D.getMonth(), i).getDay() == 0) {
                calendar += '<tr>';
            }
        }

        // пустые ячейки в конце календаря
        for (let i = DNlast; i < 7; i++) calendar += '<td>&nbsp;';

        // вывод тела таблицы
        document.querySelector(`#${id} tbody`).innerHTML = calendar;

        // вывод шапки таблицы месяц и год
        document.querySelector(`#${id} thead td:nth-child(2)`).innerHTML = `${monthArr[D.getMonth()]} ${D.getFullYear()}`;

        // добавление атрибутов
        document.querySelector(`#${id} thead td:nth-child(2)`).dataset.month = D.getMonth();
        document.querySelector(`#${id} thead td:nth-child(2)`).dataset.year = D.getFullYear();

        // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
        if (document.querySelectorAll(`#${id} tbody tr`).length < 6) {
            document.querySelector(`#${id} tbody`).innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
        }

        // блокировка старых дат
        document.querySelectorAll('[data-date]').forEach(item => {
            if (item.dataset.date < getTimeToday) {
                item.classList.add('disactive');
            } else {
                item.classList.add('future__day');
            }
        })

        // выбор промежутка даты
        // лимит на клик
        let selectDate = 0;
        // кол-во ms в сутках
        const oneDayMs = 86400000;
        // ms начальная дата
        let dayStart = 0;
        // ms конечная дата
        let dayEnd = 0;

        const resetStylesDay = (elem) => {
            elem.classList.remove('active__day')
            elem.classList.remove('active__day-end')
            elem.classList.remove('active__day-interval')
            elem.classList.remove('active__day-start')
        }

        // выбор даты событие
        document.querySelectorAll('.future__day').forEach((day) => {
            day.addEventListener('click', (e) => {
                // атрибут клика
                const thisDay = day.dataset.date;

                // перевод в чел вид даты
                function getDateForInputValue(dataAtrDay) {
                    return `${new Date(+dataAtrDay).getFullYear()}.${new Date(+dataAtrDay).getMonth()+1}.${new Date(+dataAtrDay).getDate()}`;
                }

                // получение input
                function getInputForSetValue(selector, valueDay) {
                    document.querySelector(selector).value = editDateForValueInput(getDateForInputValue(valueDay));
                }

                // очистить input
                function resetInputValue(selector) {
                    document.querySelector(selector).value = '';
                }

                // если нет класса active__day && счетчик лимита на клик < 1
                if (!day.classList.contains('active__day') && selectDate < 1) {
                    // увеличить счетчик
                    selectDate++;
                    // снять класс active__day со всех
                    document.querySelectorAll('.future__day').forEach((item) => {
                        item.classList.remove('active__day');
                    });
                    // добавить классы
                    day.classList.add('active__day');
                    day.classList.add('active__day-start');
                    // отобразить в input начальную дату
                    getInputForSetValue('.input__day-start', thisDay)
                    // записать начальную дату в ms
                    dayStart = thisDay;

                } else if (selectDate < 2) {
                    selectDate++;
                    // если выбрать числа от большего к меньшему
                    if (thisDay < dayStart) {
                        dayEnd = dayStart;
                        dayStart = thisDay;
                        document.querySelector(`[data-date="${dayEnd}"]`).classList.remove('active__day-start');
                        document.querySelector(`[data-date="${dayEnd}"]`).classList.add('active__day-end');
                        day.classList.add('active__day');
                        day.classList.add('active__day-start');
                        getInputForSetValue('.input__day-start', thisDay);
                        getInputForSetValue('.input__day-end', dayEnd);
                    } else {
                        day.classList.add('active__day');
                        day.classList.add('active__day-end');
                        getInputForSetValue('.input__day-end', thisDay)
                        dayEnd = thisDay;
                    }

                    // расчет сколько дней в промежутке между началом и концом
                    let interval = dayEnd;

                    for (let i = ((+dayEnd - +dayStart) / oneDayMs) - 1; i > 0; i--) {
                        interval -= oneDayMs;
                        // получение элементов по атрибуту промежуточного(-ных) дней. Добавление класса
                        document.querySelector(`[data-date="${interval}"]`).classList.add('active__day-interval');
                    }
                } else if (selectDate == 2) {
                    // сбросс счетчика и очистка календаря от активных(выбраных) дат
                    document.querySelectorAll('.future__day').forEach((item) => {
                        resetStylesDay(item);
                    });
                    resetInputValue('.input__day-start');
                    resetInputValue('.input__day-end');
                    selectDate = 0;
                } else {
                    return;
                }
            })
        })

        // если нужен выбор одного дня
        // document.querySelectorAll('.future__day').forEach((day) => {
        //     day.addEventListener('click', (e) => {
        //         const thisDay = day.dataset.date;
        //         const correctDay = `${new Date(+thisDay).getFullYear()}.${new Date(+thisDay).getMonth()+1}.${new Date(+thisDay).getDate()}`;
        //         if (!day.classList.contains('active__day')) {
        //             document.querySelectorAll('.future__day').forEach((item) => {
        //                 item.classList.remove('active__day');
        //             });
        //             day.classList.add('active__day');
        //             document.querySelector('.input__day').value = correctDay;
        //         } else {
        //             return
        //         }
        //         console.log(`${new Date(+thisDay).getFullYear()}.${new Date(+thisDay).getMonth()}.${new Date(+thisDay).getDate()}`);
        //     })
        // })

    }
    // вызов ф-ции (id, год сегодня, месяц сегодня)
    Calendar("calendar", new Date().getFullYear(), new Date().getMonth());

    // переключатель минус месяц
    document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(1)').addEventListener('click', () => {
        Calendar("calendar", document.querySelector('#calendar thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month) - 1);
    });

    // переключатель плюс месяц
    document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(3)').addEventListener('click', () => {
        Calendar("calendar", document.querySelector('#calendar thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month) + 1);
    });

    function editDateForValueInput(correctDay) {
        return correctDay.split('.').reverse().reduce((acc, item) => {
            if (item.length < 2) {
                acc += `0${item}.`;
            } else {
                acc += `${item}.`;
            }
            return acc;
        }, '').slice(0, -1);
    }

});