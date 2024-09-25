function update() {
    // Получаем значения из формы
    let xval = document.getElementById("x-values").value; 
    let yval = document.getElementById("y-values").value;  
    let rvals = document.getElementById("r-values");

    // Проверяем корректность ввода
    let validInput = checkInput(xval, yval, rval);
    
    if (validInput) {
        // Отправляем AJAX-запрос
        $.ajax({
            type: "POST",
            url: 'http://localhost:8080/web_lab1.fr/html/', // Заменить на реальный URL
            async: false,
            data: { "x": xval, "y": yval, "r": rval },
            success: function (data) {
                updateTable(data);
            },
            error: function (xhr, textStatus, err) {
                alert("readyState: " + xhr.readyState + "\n"+
                      "responseText: " + xhr.responseText + "\n"+
                      "status: " + xhr.status + "\n"+
                      "text status: " + textStatus + "\n" +
                      "error: " + err);
            }
        });

        console.log(xval, yval, rval);
    }
}

function checkInput(x, y, r) {
    // Преобразуем значения X, Y, R в числа
    x = parseFloat(x);
    y = parseFloat(y);
    r = parseFloat(r);
   // Пример простой валидации
   if (isNaN(x) || isNaN(y) || isNaN(r)) {
       alert("Ошибка: Все значения должны быть числами.");
       return false;
   }

   // Проверка диапазона для Y
   if (y < -5 || y > 3) {
       alert("Ошибка: Y должен быть в диапазоне от -5 до 3.");
       return false;
   }

   return true; 
}

function updateTable(data) {
    let storage = window.localStorage;
    
    // Добавляем новые данные в localStorage
    let currentData = storage.getItem('tableData');
    storage.setItem('tableData', (currentData ? currentData : '') + data);

    // Обновляем таблицу на странице
    $('#table tr:last').after(data);
}
