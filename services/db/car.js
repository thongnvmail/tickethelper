'use strict';

/* Base functions for interacting with database */
const base = require('./base');

/**
 * Name of script table
 * @type {String}
 */
const TABLE_NAME = 'Car';

/**
 * Get Car with condition
 * @return {Object} Car entity
 */
var fetchCars = function() {
    var criteria = {
    }
    return base.fetch(TABLE_NAME, criteria);
};

/**
 * Get Car by CarId
 * @param  {String} Car id of exam
 * @return {Object} Car entity
 */
var fetchOne = function(id) {
    var condition = {
        where: {
            id: id
        }
    };
    return base.fetchOne(TABLE_NAME, condition);
};


/**
 * update information for Car by CarID
 * @param  {String} id      id of Car
 * @param  {Object} data        data for update
 * @param  {Object} transaction
 * @return {Object}
 */
var updateCar = function(id, data, transaction) {
    var condition = {
        where: {
            id: id
        },
        transaction: transaction
    };

    return base.update(TABLE_NAME, data, condition);
};

/**
 * insert Car to DB
 * @param  {Object} Car information of entity
 * @param  {Object} transaction
 * @return {Object}
 */
var addCar = function(Car, transaction) {
    var options = {};
    options.transaction = transaction;

    return base.create(TABLE_NAME, Car, options);
};

/**
 * delete Car by CarId
 * @param  {String} CarID: id for identify of User
 * @param  {Object} transaction
 * @return {Object}
 */
var deleteCar = function(id, transaction) {
    var condition = {
        where: {
            id: id
        },
        transaction: transaction
    };

    return base.remove(TABLE_NAME, condition);
};


module.exports = {
    fetchCars: fetchCars,
    fetchOne: fetchOne,
    updateCar: updateCar,
    addCar: addCar
};
