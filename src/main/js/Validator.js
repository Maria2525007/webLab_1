function checkInput(x, y, r) {
    let validationInfoPanel = document.querySelector('.validationInfo');
    let validationInfo = '';
    let isValid = true;

    // Убираем предыдущие сообщения
    validationInfoPanel.classList.remove("show");

    // Проверка X
    if (!isNaN(x) && x.trim() !== "") {
        x = parseFloat(x);
    } else {
        validationInfo += "<span>X должен быть числом!</span><br>";
        isValid = false;
    }

    // Проверка Y
    if (!isNaN(y) && y.trim() !== "") {
        y = parseFloat(y);
        if (y < -5 || y > 3) {
            validationInfo += "<span>Y должен быть в диапазоне [-5..3]!</span><br>";
            isValid = false;
        }
    } else {
        validationInfo += "<span>Y должен быть числом!</span><br>";
        isValid = false;
    }

    // Проверка R
    if (!isNaN(r) && r.trim() !== "") {
        r = parseFloat(r);
    } else {
        validationInfo += "<span>R должен быть числом!</span><br>";
        isValid = false;
    }

    // Если есть ошибки, показываем их на экране
    if (!isValid) {
        validationInfoPanel.innerHTML = validationInfo;
        validationInfoPanel.classList.add("show");
    }

    return isValid;
}


function validateTextField() {
    // Удаляем все нечисловые символы, кроме знаков "-" и "."
    $('.y-text').on('input', function() {
        $(this).val($(this).val().replace(/[^-.\d]/g, ''));
    });
}