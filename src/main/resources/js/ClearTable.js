function clearTable() {
    // Очистка содержимого таблицы, включая строку заголовков
    $('#table').html(`
        <tr>
            <th>X</th>
            <th>Y</th>
            <th>R</th>
            <th>Текущее время</th>
            <th>Время работы скрипта</th>
            <th>Результат</th>
        </tr>
    `);

    // Удаление сохраненных данных из localStorage
    if (window.localStorage.getItem('tableData')) {
        window.localStorage.removeItem('tableData');
        console.log("Таблица и данные успешно очищены.");
    } else {
        console.log("Нет данных для очистки.");
    }
}