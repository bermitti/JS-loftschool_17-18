import { isArray } from "util";

/* ДЗ 2 - работа с исключениями и отладчиком */

/*
 Задача 1:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isAllTrue(array, fn) {
    if ( !Array.isArray(array) || !array.length ) {
        // выбрасываем исключения
        throw new Error('empty array');
    }
    if (typeof fn !== 'function') {
        // выбрасываем исключения
        throw new Error('fn is not a function');
    }
    for (let i = 0; i < array.length; i++) {
        if (!fn(array[i])) {
            // директива return – функция завершается и значение передается обратно.
            return false;
        }
    }

    return true;
}

/*
 Задача 2:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isSomeTrue(array, fn) {
    if (!Array.isArray(array) || array.length == 0) {
        throw new Error('empty array');
    }
    if (typeof(fn) != 'function') {
        throw new Error('fn is not a function')
    }
    for (let i = 0; i < array.length; i++) {
        if (fn(array[i])) {
            return true;
        } 
    }

    return false;
}

/*
 Задача 3:
 Функция принимает заранее неизвестное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запусти fn для каждого переданного аргумента (кроме самой fn)
 Функция должна вернуть массив аргументов, для которых fn выбросила исключение
 Необходимо выбрасывать исключение в случаях:
 - fn не является функцией (с текстом "fn is not a function")
 */
function returnBadArguments(fn, ...rest) {
    if (typeof(fn) != 'function') {
        throw new Error('fn is not a function');
    }
    let result =[];

    for (let i = 0; i < rest.length; i++) {
        try {
            // если fn выбросит исключение
            fn(rest[i]);
        } catch (error) {
            // ловим исключение и добавляем в массив элемент, для которого выброшено исключение
            result.push(rest[i]);
        }
    }

    return result;
}

// // variant 2 with arguments
// function returnBadArguments(fn) {
//     if (typeof(fn) != 'function') {
//         throw new Error('fn is not a function');
//     }
//     let result =[];

//     for (let i = 1; i < arguments.length; i++) {
//         try {
//             // если fn выбросит исключение
//             fn(arguments[i]);
//         } catch (e) {
//             // ловим исключение и добавляем в массив элемент, для которого выброшено исключение
//             result.push(arguments[i]);
//         }
//     }

//     return result;
// }

/*
 Задача 4:
 Функция имеет параметр number (по умолчанию - 0)
 Функция должна вернуть объект, у которого должно быть несколько методов:
 - sum - складывает number с переданными аргументами
 - dif - вычитает из number переданные аргументы
 - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
 - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно
 Необходимо выбрасывать исключение в случаях:
 - number не является числом (с текстом "number is not a number")
 - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */
function calculator(number = 0) {
    // в JavaScript есть обычные числа и три специальных числовых значения: NaN, Infinity и -Infinity
    // isFinite(n) преобразует аргумент к числу и возвращает true, если это не Infinity/-Infinity/NaN
    // правая часть отсеет заведомо не-числа, но оставит такие значения как true/false/null и пустую строку '', так как они корректно преобразуются в числа.
    // parseFloat преобразует аргумент к строке( true/false/null становятся "true"/"false"/"null"), а затем считывает число, при этом пустая строка даёт NaN
    // isNaN(n) преобразует аргумент к числу и возвращает true, если получилось NaN, и false – для любого другого значения.
    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    if ( !isNumeric(number) ) {
        throw new Error('number is not a number or NaN or +/-Infinity')
    }

    // возвращаем объект с методами
    return {
        // arr.reduce(callback[, initialValue]) обработка каждого эл. массива с сохранением промежуточного результата
        // aргументы функции callback(previousValue, currentItem, index, arr)
        // previousValue – последний результат вызова функции(«промежуточный результат»)
        sum: function sum(...rest) {
            return rest.reduce((a, b) => (a + b), number)
        }, 
        dif(...rest) {
            return rest.reduce((a, b) => (a - b), number)
        },
        div(...rest) {
            // проверка переданных аргументов на ноль
            rest.forEach(function (item) {
                if (item == 0) {
                    throw new Error('division by 0')
                }
            });

            // если нулей нет, то выполняем последовательное деление
            return rest.reduce((a, b) => (a / b), number)
            // return rest.reduce(
            //     function (a, b) {
            //         a / b 
            //     }, number)
        },
        mul(...rest) {
            return rest.reduce((a, b) => a * b, number)
        }
    }
}

export {
    isAllTrue,
    isSomeTrue,
    returnBadArguments,
    calculator
};
