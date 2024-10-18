function checkInput(x, y, r) {
    const hiddenSpan = document.querySelectorAll(".hidden");
    console.log(hiddenSpan);
    let isValid = true;

    // Убираем предыдущие сообщения
    hiddenSpan.forEach(element => {
        element.classList.remove("show");
        element.classList.add("hidden");
    });

     // Проверка X: проверяем, что значение является числом в заданном диапазоне
     if (isNaN(x) || x > 5 || x < -3) {
        const wrongX = document.getElementById('wrongX')
        wrongX.classList.remove("hidden");
        wrongX.classList.add("show");
        console.log(wrongX.classList);
        isValid = false;
    }

    // Проверка Y: проверяем, что значение является числом и находится в диапазоне [-5, 3]
    if (isNaN(y) || y <= -5 || y >= 3) {
        const wrongY = document.getElementById("wrongY");
        wrongY.classList.remove("hidden");
        wrongY.classList.add("show");
        console.log(wrongY);
        isValid = false;
    }

    // Проверка R: проверяем, что значение является числом в заданном диапазоне [1, 3]
    if (isNaN(r) || r < 1 || r > 3) {
        const wrongR = document.getElementById("wrongR");
        console.log(wrongR.classList);
        wrongR.classList.remove("hidden");
        wrongR.classList.add("show");
        isValid = false;
    }

    return isValid;
}
function validate(){
    let xval = parseFloat(document.getElementById("x-values").value.trim());
    let yval = parseFloat(document.getElementById("y-values").value.trim());
    let rval = parseFloat(document.getElementById("r-values").value.trim());

    let validInput = checkInput(xval, yval, rval);
    return validInput;
}