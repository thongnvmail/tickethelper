var bookService = require('../services/db/book');

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
    bookService.fetchByIsRead(true).then(function(bookList) {
		console.log('new books: ' + JSON.stringify(bookList));
		res.status(200).json(bookList);
	})
	.catch(function(err) {
		console.log('NO_CONTENT');
		res.status(404).end();
	});
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
    book.isRead = false;
    bookService.addBook(book).then(function(d){
        console.log(JSON.stringify(d));
        res.status(201).json(d);
    }).catch(function(e) {
        console.log(JSON.stringify(e));
        throw e;
    });
}