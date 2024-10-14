function checkInput(xval, yval, rval) {

    // Простая валидация данных
    if (isNaN(xval) || isNaN(yval) || isNaN(rval)) {
        console.log("Ошибка: Все значения должны быть числами.");
        alert("Все значения должны быть числами.");
        return false;
    }
    if (xval < -5 || xval > 3) {
        console.log("Ошибка: Значение X должно быть в диапазоне от -5 до 3.");
        alert("Значение X должно быть в диапазоне от -5 до 3.");
        return false;
    }
    if (yval < -5 || yval > 3) {
        console.log("Ошибка: Значение Y должно быть в диапазоне от -5 до 3.");
        alert("Значение Y должно быть в диапазоне от -5 до 3.");
        return false;
    }
    if (rval < 1 || rval > 3 || rval % 0.5 !== 0) {
        console.log("Ошибка: Значение R должно быть в диапазоне от 1 до 3 и быть кратным 0.5.");
        alert("Значение R должно быть в диапазоне от 1 до 3 и быть кратным 0.5.");
        return false;
    }
    console.log("Данные валидны.");
    return true;
}