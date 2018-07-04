/* ДЗ 5 - DOM Events */

/**
 * Функция должна добавлять обработчик fn события eventName к элементу target
 *
 * @param {string} eventName - имя события, на которое нужно добавить обработчик
 * @param {Element} target - элемент, на который нужно добавить обработчик
 * @param {function} fn - обработчик
 */
function addListener(eventName, target, fn) {
    target.addEventListener(eventName, fn);
}

/**
 * Функция должна удалять обработчик fn события eventName у элемента target
 *
 * @param {string} eventName - имя события, для которого нужно удалить обработчик
 * @param {Element} target - элемент, у которого нужно удалить обработчик
 * @param {function} fn - обработчик
 */
function removeListener(eventName, target, fn) {
    target.removeEventListener(eventName, fn);
}

/**
 * Функция должна добавлять к target обработчик события eventName, который должен отменять действие по умолчанию
 *
 * @param {string} eventName - имя события, для которого нужно удалить обработчик
 * @param {Element} target - элемент, на который нужно добавить обработчик
 */
function skipDefault(eventName, target) {
    target.addEventListener(eventName, e => e.preventDefault());
}

/**
 * Функция должна эмулировать событие click для элемента target
 *
 * @param {Element} target - элемент, на который нужно добавить обработчик
 */
function emulateClick(target) {
    target.click();
}

// # 2
// function emulateClick(target) {
//     let event = new CustomEvent("click");

//     // выполнить для любого элемента
//     target.dispatchEvent(event);
// }

/**
 * Функция должна добавить такой обработчик кликов к элементу target
 * который реагирует (вызывает fn) только на клики по элементам BUTTON внутри target
 *
 * @param {Element} target - элемент, на который нужно добавить обработчик
 * @param {function} fn - функция, которую нужно вызвать при клике на элемент BUTTON внутри target
 */
function delegate(target, fn) {
    let handler = function (e) {
        if (e.target.tagName == 'BUTTON') {
            fn();
        }
    }

    target.addEventListener('click', handler);
}

/**
 * *** Со звездочкой ***
 * Функция должна добавить такой обработчик кликов к элементу target
 * который сработает только один раз и удалится
 * Постарайтесь не создавать глобальных переменных
 *
 * @param {Element} target - элемент, на который нужно добавить обработчик
 * @param {function} fn - обработчик
 */
function once(target, fn) {
    target.addEventListener('click', fn, { once: true });
    // once: Boolean указывает, что слушатель должен быть вызван не более одного раза после добавления. 
    // Если true, слушатель автоматически удаляется при вызове.
}

// #2
// function once(target, fn) {
//     let handler = function () {
//         fn();
//         target.removeEventListener('click', handler);
//     }

//     target.addEventListener('click', handler);
// }

// #3
// function once(target, fn) {
//     target.addEventListener("click", fn);
//     target.addEventListener("click", () => {
//       target.removeEventListener("click", fn);
//     });
//   }

export {
    addListener,
    removeListener,
    skipDefault,
    emulateClick,
    delegate,
    once
};
