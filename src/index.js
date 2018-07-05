/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise(seconds) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            return resolve();
        }, seconds*1000)
    })
}

// #2
// function delayPromise(seconds) {
//     return new Promise(resolve => {
//         setTimeout(() => resolve(), seconds*1000);
//     });
// }

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {
    return new Promise(function (resolve, reject) {
        const req = new XMLHttpRequest();
        let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

        // т.к. ответ - объект, то функция сравнения такая
        function compare(a, b) {
            if (a.name < b.name) { 
                return -1; 
            } 
            if (a.name > b.name) { 
                return 1; 
            } 
  
            return 0;
        }

        req.open('GET', url);
        req.onload = function () {
            if (req.status != 200) {
                reject('что-то не так')
            } else {
                // JSON.parse(str) превратит строку с данными в формате JSON в JavaScript-объект/массив/значение
                let result = JSON.parse(req.response);

                result.sort(compare);
                resolve(result);
            }
        }
        req.send();
    })
}
// проверка для себя, т.к. тесты не работают
// loadAndSortTowns()
//   .then( (value) => {
//     console.log(typeof(value));
//     console.log(value);
//   })

export {
    delayPromise,
    loadAndSortTowns
};
