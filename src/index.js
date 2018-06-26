/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
    let newArr = [];

    for (let i = 0; i < array.length; i++) {
        let item = array[i];
        
        newArr.push( fn(item, i, array) );
    }

    return newArr;
}

/*
 Задача 3:   (previousValue, currentItem, index, array)
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
    let result;

    if (initial) {
        result = initial;
        for (let i = 0; i < array.length; i++) {
            result = fn(result, array[i], i, array)
        }
    } else {
        result = array[0];
        for (let i = 1; i < array.length; i++) {
            result = fn(result, array[i], i, array)
        }
    }

    return result;
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходимo удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
    delete obj[prop];
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли указанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
    // variant-1 // return obj.hasOwnProperty(prop);
    // variant-2 //  return typeof obj[prop] != 'undefined';
    return prop in obj;
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
    return Object.keys(obj);
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
    let result =[];

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            result.push( key.toUpperCase() );
        }
    }

    return result;

    // variant-2 // тесты не проходит , но работает :)
    // let result =[];
    // Object.keys(obj).forEach(
    //     function (item) {
    //         result.push( item.toUpperCase() );
    //     });
    // return result;
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
// работает , но тесты не проходит
function slice(array, from, to) {
    let newArr = [];
    let start = from;
    let finish = to;

    if ( !from ) {
        start = 0;
    } else if ( -array.length <= from && from < 0 ) {
        start = array.length + from;
    }

    if ( !to ) {
        finish = array.length;
    } else if ( to > array.length ) {
        finish = array.length;
    } else if ( -array.length <= to && to < 0 ) {
        finish = array.length + to;
    }

    for (let i = start; i < finish; i++) {
        newArr.push( array[i] );
    }

    return newArr;
}

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    return new Proxy(obj, {
        set(target, prop, value) {
            target[prop] = value * value;
            
            return value;
        }
    })
}

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};
