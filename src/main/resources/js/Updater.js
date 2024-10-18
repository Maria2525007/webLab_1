function update() {
    let xval = parseFloat(document.getElementById("x-values").value);
    let yval = parseFloat(document.getElementById("y-values").value.trim().replace(",", "."));
    let rval = parseFloat(document.getElementById("r-values").value);

    let validInput = checkInput(xval, yval, rval);

    console.log("Отправка данных:");
    console.log("X:", xval);
    console.log("Y:", yval);
    console.log("R:", rval);
    console.log("Валидные данные:", validInput);

    if (validInput) {
        $.ajax({
            type: "POST",
            url: '/fcgi-bin/server.jar',
            async: false,
            data: JSON.stringify({ "x": xval, "y": yval, "r": rval }),

            success: function (data) {
                console.log("Запрос успешно отправлен и получен ответ:");
                console.log("Ответ сервера:", data);

                const tableData = {
                    x: xval,
                    y: yval,
                    r: rval,
                    hit: data.response.hit,
                    currentTime: data.currentTime,
                    elapsedTime: data.elapsedTime
                };

                let savedData = JSON.parse(sessionStorage.getItem('data')) || [];
                savedData.push(tableData);
                sessionStorage.setItem('data', JSON.stringify(savedData));

                updateTable(xval, yval, rval, data.currentTime, data.elapsedTime, data.response.hit,);
            },
            error: function (xhr, textStatus, err) {
                console.log("Ошибка при отправке запроса:");
                alert("readyState: " + xhr.readyState + "\n" +
                      "responseText: " + xhr.responseText + "\n" +
                      "status: " + xhr.status + "\n" +
                      "text status: " + textStatus + "\n" +
                      "error: " + err);
            }
        });
    }
}



document.addEventListener("DOMContentLoaded", loadTableData);

function loadTableData() {
    const savedData = JSON.parse(sessionStorage.getItem('data')) || [];

    savedData.forEach(item => {
        updateTable(item.x, item.y, item.r, item.currentTime, item.elapsedTime, item.hit);
    });
}



function updateTable(x, y, r, currentTime, elapsedTime, hit) {
    const resultBody = document.getElementById("table");
    const newRow = document.createElement("tr");

    const xCell = document.createElement("td");
    xCell.textContent = x;

    const yCell = document.createElement("td");
    yCell.textContent = y;

    const rCell = document.createElement("td");
    rCell.textContent = r;

    const resultCell = document.createElement("td");
    resultCell.textContent = hit ? "Попал" : "Промах";

    const currentTimeCell = document.createElement("td");
    currentTimeCell.textContent = currentTime;

    const elapsedTimeCell = document.createElement("td");
    elapsedTimeCell.textContent = elapsedTime + " ms";

    newRow.appendChild(xCell);
    newRow.appendChild(yCell);
    newRow.appendChild(rCell);
    newRow.appendChild(resultCell);
    newRow.appendChild(currentTimeCell);
    newRow.appendChild(elapsedTimeCell);

    resultBody.appendChild(newRow);
}

