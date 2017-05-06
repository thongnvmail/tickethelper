'use strict'
const model = require('../../model');
const result = require('../../dto/result');

/**
 * @function
 * @sumary Fetch entity by condition
 * @param {String} entity 	Entity name
 * @param {Object} condition	Conditions to recieve data
 * @return {Object}		Return a promise with output is entity data
 * @throws Database Error: Return respone code = 200 (DB connection), Message code : MSG504
 */
var fetch =  function(entity, criteria) {
	return model[entity].findAll(criteria).then(function(dataList) {
            return dataList;
	}).catch(function(error) {
        console.log(error);
        throw result.databaseErrorMessageFactory();
    });
}

/**
 * @function
 * @summary Fetch entity by condition
 * @param  {String} entity    Entity name
 * @param  {Object} condition Conditions to retrieve data
 * @return {Object}           Return a promise with output is entity data
 * @throws Database Error : Return response code = 200 (DB connection), Message code : MSG504
 */
var fetchOne = function(entity, condition) {
    return fetch(entity, condition)
        .then(function(dataList) {
            return dataList[0];
        }).catch(function(error) {
            throw result.databaseErrorMessageFactory();
        });
};

/**
 * @function
 * @summary Create new entity by data
 * @param  {String} entity  Entity name
 * @param  {Object} data    Entity information
 * @param  {Object} options Options if any
 * @return {Object}         Return a promise with output is message
 * @throws Database Error : Return response code = 200 (DB connection), Message code : MSG504
 */
var create = function(entity, data, options) {
    return model[entity].create(data, options).then(function(d) {
        return d;
    }).catch(function(error) {
        console.log(JSON.stringify(error));
        throw result.databaseErrorMessageFactory();
    });
};

/**
 * @function
 * @summary Create new entitys by data
 * @param  {String} entity  Entity name
 * @param  {Object} data    Entity information
 * @param  {Object} options Options if any
 * @return {Object}         Return a promise with output is message
 * @throws Database Error : Return response code = 200 (DB connection), Message code : MSG504
 */
var bulkCreate = function(entity, data, options) {
    return model[entity].bulkCreate(data, options).then(function(d) {
        return d;
    }).catch(function(error) {
        throw result.databaseErrorMessageFactory();
    });
};

/**
 * @function
 * @summary update entity base on data with condition
 * @param  {String} entity    Entity name
 * @param  {Object} data      Entity information
 * @param  {Object} condition Conditions to retrieve data
 * @return {Object}           Return a promise with output is message
 * @throws Database Error : Return response code = 200 (DB connection), Message code : MSG504
 */
var update = function(entity, data, condition) {
    return model[entity].update(data, condition).then(function() {
        return result.successMessageFactory();
    }).catch(function(error) {
        console.log(console.log(JSON.stringify(error)));
        throw result.databaseErrorMessageFactory();
    });
};

/**
 * @function
 * @summary Remove entity which match with condition
 * @param  {String} entity    Entity name
 * @param  {Object} condition Conditions to retrieve data
 * @return {Object}           Return a promise with output is message
 * @throws Database Error : Return response code = 200 (DB connection), Message code : MSG504
 */
var remove = function(entity, condition) {
    return model[entity].destroy(condition).then(function() {
        return result.successMessageFactory();
    }).catch(function(error) {
        throw result.databaseErrorMessageFactory();
    });
};

module.exports = {
    fetch: fetch,
    fetchOne: fetchOne,
    create: create,
    bulkCreate: bulkCreate,
    update: update,
    remove: remove
};
