var bookService = require('../services/db/book');
var carService = require('../services/db/car');
const http = require("http");
var request = require('request');
const token = '93cd84d7-7c92-429d-b252-50da999aa568';

function checkBookNow(book) {
    return book.book_type === 'book_now';
}

function checkScheduleBook(book) {
    return book.book_type === 'schedule_book';
}
exports.getRequests = function(req, res) {
    bookService.fetchBooks().then(function(bookList) {
            // console.log(JSON.stringify(bookList));
            var bookNows = bookList.filter(checkBookNow);
            var scheduleBook = bookList.filter(checkScheduleBook);
            res.status(200).json({ book_now: bookNows, schedule_book: scheduleBook });
        })
        .catch(function(err) {
            console.log('NO_CONTENT');
            res.status(404).end();
        });
}

exports.findNewRequest = function(req, res) {
    bookService.fetchByIsRead(false).then(function(bookList) {
            // console.log('new books: ' + JSON.stringify(bookList));
            var bookNows = bookList.filter(checkBookNow);
            var scheduleBook = bookList.filter(checkScheduleBook);
            res.status(200).json({ book_now: bookNows, schedule_book: scheduleBook });
        })
        .catch(function(err) {
            console.log('NO_CONTENT');
            res.status(404).end();
        });
}

exports.loadRequest = function(req, res) {
    var id = req.params.id;
    var bookDb = {};
    bookService.updateBook(id, { isRead: true }).then((updateStatus) => {
            console.log('Update status: ' + JSON.stringify(updateStatus));
            if (updateStatus.responseCode !== 0) {
                res.status(400).end();
            } else {
                return bookService.fetchOne(id);
            }
        })
        .then((book) => {
            console.log('Book: ' + JSON.stringify(book));
            if (book) {
                res.status(200).json(book);
            } else {
                res.status(404).end();
            }
        })
        .catch(function(err) {
            console.log('NO_CONTENT');
            res.status(404).end();
        });
}

exports.putBook = function(req, res) {
    var id = req.params.id;
    var book = req.body;
    book.id = id;
    bookService.updateBook(id, book).then(function(d) {
            console.log('Book: ' + JSON.stringify(d));
            res.status(201).end();
        })
        .catch(function(err) {
            console.log(JSON.stringify(err));
            console.log('Update failed');
            res.status(500).end();
        });
}

exports.addRequest = function(req, res) {

    var request = req.body;
    console.log('Ticket: ' + JSON.stringify(request));

    var book = request.data;
    book.channel = request.channel;
    book.isRead = false;
    book.book_type = 'book_now';
    console.log('Book: ' + JSON.stringify(book));
    console.log('Add book');
    book.isRead = false;
    bookService.addBook(book).then(function(d) {
        console.log(JSON.stringify(d));
        res.status(201).json(d);
    }).catch(function(e) {
        console.log(JSON.stringify(e));
        throw e;
    });
}

exports.postIdCar = function(req, res) {
    var carId = req.body.carId;
    var bookId = req.body.bookId;
    var bookDb = {};
    var requestData = {};

    carService.fetchOne(carId).then((car) => {
            if (!car) {
                res.status(404).end();
                return null;
            } else {
                console.log('Car: ' + JSON.stringify(car));
                requestData.vehicle_plate = car.vehicleNumber;
                requestData.driver_code = car.id;
                console.log('requestData: ' + JSON.stringify(requestData));
                return bookService.fetchOne(bookId);
            }
        })
        .then((book) => {
            if (!book) {
                return null;
            }
            console.log('Book by id: ' + JSON.stringify(book));
            requestData.sender_id = book.SenderId;
            requestData.ticket_id = book.id;

            requestData.requester = book.requester;
            requestData.product_name = book.product_booking;
            requestData.driver_name = null;
            requestData.driver_mobile = null;
            return sendInformAcceptRequest(requestData);
        })
        .then((body) => {
            var jsonBody = JSON.parse(body);
            console.log('Success: ' + jsonBody.success);
            if (jsonBody && jsonBody.success) {
                console.log('Send request sucessfully');
                return bookService.updateBook(bookId, { status: 1, car_id: carId });
            } else {
                console.log('Send request failed');
                res.status(500).end();
                return null;
            }
        })
        .then((updateStatus) => {
            if (!updateStatus) {
                return null;
            }
            console.log('Update status: ' + JSON.stringify(updateStatus));
            if (updateStatus.responseCode !== 0) {
                res.status(500).end();
            } else {
                res.status(200).end();
            }
        })
        .catch((err) => {
            // console.log(console.log(JSON.stringify(err)));
            console.log('ERROR');
            console.log(err);
            res.status(404).end();
        });
}

function sendInformAcceptRequest(data) {
    return new Promise((resolve, reject) => {     
        var options = {
            hostname: 'gk2s-fb-bot3.herokuapp.com',
            port: 80,
            path: '/bot/informAccepted',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        };
        var req = http.request(options, function(res) {
            console.log('Status: ' + res.statusCode);
            console.log('Headers: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function (body) {
                console.log('Response body: ' + body);
                resolve(body);
            });
        });
        req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
            reject();
        });
        // write data to request body
        console.log('Request body: ' + JSON.stringify(data));
        req.write(JSON.stringify(data));
        req.end();
    });
}