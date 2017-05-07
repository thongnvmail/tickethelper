function notify(message, type) {
    if (!type) {
        type = "info";
    }
    $.notify({
        icon: 'pe-7s-bell',
        message: message
    }, {
        type: type,
        timer: 1000
    });
}

function formatTime(Time) {
    Time = new Date(Time);
    return Time.getDate() + '/' + (Time.getMonth() + 1) + '/' + Time.getFullYear() + '<br>' +
        Time.getHours() + ':' + Time.getMinutes() + ':' + Time.getSeconds();
}