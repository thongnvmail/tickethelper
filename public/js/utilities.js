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