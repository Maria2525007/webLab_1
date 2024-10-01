function update() {
    // Получаем значения из формы и сразу обрезаем пробелы
    let xval = parseFloat(document.getElementById("x-values").value.trim());
    let yval = parseFloat(document.getElementById("y-values").value.trim());
    let rval = parseFloat(document.getElementById("r-values").value.trim());

    // Проверяем корректность ввода
    let validInput = checkInput(xval, yval, rval);
       
    console.log("Отправка данных:");
    console.log("X:", xval);
    console.log("Y:", yval);
    console.log("R:", rval);

    if (validInput) {
        // Отправляем AJAX-запрос
        $.ajax({
            type: "POST",
            url: 'http://localhost:8080/webLab_1/src/main/java/App.java', // Заменить на реальный URL
            async: false,
            data: JSON.stringify({ "x": xval, "y": yval, "r": rval }),
        
            success: function (data) {
                console.log("Запрос успешно отправлен и получен ответ:");
                console.log("Ответ сервера:", data);
                updateTable(data);
            },
            error: function (xhr, textStatus, err) {
                console.log("Ошибка при отправке запроса:");
                alert("readyState: " + xhr.readyState + "\n"+
                      "responseText: " + xhr.responseText + "\n"+
                      "status: " + xhr.status + "\n"+
                      "text status: " + textStatus + "\n" +
                      "error: " + err);
            }
        });
    }
}

function updateTable(data) {
    let storage = window.localStorage;
    
    // Добавляем новые данные в localStorage
    let currentData = storage.getItem('tableData');
    storage.setItem('tableData', (currentData ? currentData : '') + data);

    // Обновляем таблицу на странице
    $('#table tbody').append(data);
}
