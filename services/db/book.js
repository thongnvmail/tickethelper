'use strict';

/* Base functions for interacting with database */
const base = require('./base');

/**
 * Name of script table
 * @type {String}
 */
const TABLE_NAME = 'Book';

/**
 * Get Book with condition
 * @return {Object} Book entity
 */
var fetchBooks = function() {
    var criteria = {
        order: 'id DESC'
    }
    return base.fetch(TABLE_NAME, criteria);
};

/**
 * Get Book by BookId
 * @param  {String} Book id of exam
 * @return {Object} Book entity
 */
var fetchOne = function(id) {
    var condition = {
        where: {
            id: id
        }
    };
    return base.fetchOne(TABLE_NAME, condition);
};

var fetchByIsRead = function(isRead) {
    var condition = {
        where: {
            isRead: isRead
        }
    };
    return base.fetch(TABLE_NAME, condition);
};

/**
 * update information for Book by BookID
 * @param  {String} id      id of Book
 * @param  {Object} data        data for update
 * @param  {Object} transaction
 * @return {Object}
 */
var updateBook = function(id, data, transaction) {
    var condition = {
        where: {
            id: id
        },
        transaction: transaction
    };

    return base.update(TABLE_NAME, data, condition);
};

/**
 * insert Book to DB
 * @param  {Object} book information of entity
 * @param  {Object} transaction
 * @return {Object}
 */
var addBook = function(book, transaction) {
    var options = {};
    options.transaction = transaction;

    return base.create(TABLE_NAME, book, options);
};

/**
 * delete Book by BookId
 * @param  {String} BookID: id for identify of User
 * @param  {Object} transaction
 * @return {Object}
 */
var deleteBook = function(id, transaction) {
    var condition = {
        where: {
            id: id
        },
        transaction: transaction
    };

    return base.remove(TABLE_NAME, condition);
};


module.exports = {
    fetchBooks: fetchBooks,
    fetchOne: fetchOne,
    updateBook: updateBook,
    addBook: addBook,
    fetchByIsRead: fetchByIsRead
};