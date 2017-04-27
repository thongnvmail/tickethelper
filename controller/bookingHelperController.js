var bookService = require('../services/db/book');


var allData = {
    schedule_book: [
        {
            isRead: true,
            content: {
                "id": "1",
                "requester": "Nguyen Van A",
                "subject": "schedule book 1",
                "book_type": "calling",
                "product_booking": "xe 4 cho",
                "address_booking": "can Tho",
                "content": "content 1"
            }
        },
         {
            isRead: false,
            content: {
                "id": "2",
                "requester": "Nguyen Van B",
                "subject": "schedule book 2",
                "book_type": "calling",
                "product_booking": "xe 6 cho",
                "address_booking": "Quan 1, TP.HCM",
                "content": "content 1"
            }
         }
    ],
    book_now: [
         {
            isRead: true,
            content: {
                "id": "3",
                "requester": "Nguyen Van C",
                "subject": "book now 1",
                "book_type": "calling",
                "product_booking": "xe 4 cho",
                "address_booking": "can Tho",
                "content": "content 1"
            }
        },
         {
            isRead: false,
            content: {
                "id": "4",
                "requester": "Nguyen Van D",
                "subject": "book now 2",
                "book_type": "calling",
                "product_booking": "xe 6 cho",
                "address_booking": "Quan 1, TP.HCM",
                "content": "content 1"
            }
        }
    ]
}

var unreadData = {
    schedule_book: [
         {
             "id": "1",
            "requester": "Nguyen Van B",
            "subject": "schedule book 2",
            "book_type": "calling",
            "product_booking": "xe 6 cho",
            "address_booking": "Quan 1, TP.HCM",
            "content": "content 1"
        }
    ],
    book_now: [
        {
            "id": "3",
            "requester": "Nguyen Van D",
            "subject": "book now 2",
            "book_type": "calling",
            "product_booking": "xe 6 cho",
            "address_booking": "Quan 1, TP.HCM",
            "content": "content 1"
        }
    ]
}

var request = {
    "id": "2",
    "requester": "Nguyen Van B",
    "subject": "schedule book 2",
    "book_type": "calling",
    "product_booking": "xe 6 cho",
    "address_booking": "Quan 1, TP.HCM",
    "content": "content 1"
}
function checkBookNow(book) {
    return book.book_type === 'book_now';
}
function checkScheduleBook(book) {
    return book.book_type === 'schedule_book';
}
exports.getRequests = function (req, res) {
    bookService.fetchBooks().then(function(bookList) {
		console.log(JSON.stringify(bookList));
        var bookNows = bookList.filter(checkBookNow);
        var scheduleBook = bookList.filter(checkScheduleBook);
		res.status(200).json({book_now: bookNows, schedule_book: scheduleBook});
	})
	.catch(function(err) {
		console.log('NO_CONTENT');
		res.status(404).end();
	});
}

exports.findNewRequest = function (req, res) {
    res.status(200).json(unreadData);
}

exports.loadRequest = function (req, res) {
    var id = req.params.id;
    var bookDB;
    bookService.fetchOne(id).then(function(book) {
		console.log('Book: ' + JSON.stringify(book));
        bookDB = book;
		res.status(200).json(book);
	})
    .then(function(succecced) {
        bookDB.isRead = true;
        console.log('Book: ' + JSON.stringify(bookDB));
        return bookService.updateBook(bookDB.id, bookDB);
    })
	.catch(function(err) {
		console.log('NO_CONTENT');
		res.status(404).end();
	});
}

exports.addRequest = function (req, res) {
    var book = req.body;
    console.log('Add book');
    bookService.addBook(book).then(function(d){
        console.log(JSON.stringify(d));
        res.status(201).json(d);
    }).catch(function(e) {
        console.log(JSON.stringify(e));
        throw e;
    });
}