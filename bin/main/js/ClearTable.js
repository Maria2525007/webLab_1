function clearTable() {
    let storage = window.localStorage;
    storage.removeItem('points');
    $('#table tbody').empty();
}