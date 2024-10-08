function checkInput(x, y, r) {
    let validationInfoPanel = document.querySelector('.validationInfo');
    let validationInfo = '';
    let isValid = true;

    // Убираем предыдущие сообщения
    validationInfoPanel.innerHTML = '';
    validationInfoPanel.classList.remove("show");

     // Проверка X: проверяем, что значение является числом в заданном диапазоне
     if (isNaN(x) || x < -3 || x > 5) {
        validationInfo += "<span>X должен быть числом в диапазоне [-3..5]!</span><br>";
        isValid = false;
    }

    // Проверка Y: проверяем, что значение является числом и находится в диапазоне [-5, 3]
    if (isNaN(y) || y < -5 || y > 3) {
        validationInfo += "<span>Y должен быть числом в диапазоне [-5..3]!</span><br>";
        isValid = false;
    }

    // Проверка R: проверяем, что значение является числом в заданном диапазоне [1, 3]
    if (isNaN(r) || r < 1 || r > 3) {
        validationInfo += "<span>R должен быть числом в диапазоне [1..3]!</span><br>";
        isValid = false;
    }

    // Если есть ошибки, показываем их на экране
    if (!isValid) {
        validationInfoPanel.innerHTML = validationInfo;
        validationInfoPanel.classList.add("show");
    }

    return isValid;
}
