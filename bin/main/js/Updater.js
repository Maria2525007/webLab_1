function update() {
    // Получаем значения из формы и сразу обрезаем пробелы
    let xval = parseFloat(document.getElementById("x-values").value.trim());
    let yval = parseFloat(document.getElementById("y-values").value.trim());
    let rval = parseFloat(document.getElementById("r-values").value.trim());

    let validInput = checkInput(xval, yval, rval);

    // Проверяем корректность ввода
    console.log("Отправка данных:");
    console.log("X:", xval);
    console.log("Y:", yval);
    console.log("R:", rval);
    console.log("Валидные данные:", validInput);

    if (validInput) {
        // Отправляем fetch-запрос
        fetch('/s290102/httpd-root/fcgi-bin/server.jar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ x: xval, y: yval, r: rval })
        })
        .then(response => response.json())
        .then(result => {
            console.log("Запрос успешно отправлен и получен ответ:");
            console.log("Ответ сервера:", result);
            updateTable(result);
        })
        .catch(error => {
            console.log("Ошибка при отправке запроса:");
            alert("Ошибка: " + error);
        });
    }
}

function updateTable(result) {
    let storage = window.localStorage;
    
    // Добавляем новые данные в localStorage
    let points = JSON.parse(storage.getItem('points')) || [];
    points.push(result);
    storage.setItem('points', JSON.stringify(points));

    // Обновляем таблицу на странице
    let newRow = `<tr>
                    <td>${result.x}</td>
                    <td>${result.y}</td>
                    <td>${result.r}</td>
                    <td>${new Date().toLocaleString()}</td>
                    <td>${result.executionTime} ms</td>
                    <td>${result.hit ? 'Попадание' : 'Промах'}</td>
                  </tr>`;
    $('#table tbody').append(newRow);
}