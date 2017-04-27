/* (C)2017 NTT DOCOMO, INC. All Rights Reserved. */
'use strict';

/**
 * Custom json data response to client
 * @param  {Boolean} success  check request is success or not
 * @param  {Integer} httpCode statu code response
 * @param  {Integer} errorCode error code
 * @return {Object} response data
 */
var messageFactory = function(success, httpCode, errorCode) {
    var messageDTO = {
        responseCode: errorCode
    };
    return success ? messageDTO : {
        httpCode: httpCode,
        messageDTO: messageDTO
    };
};

/**
 * Send data response when success
 * @return {Object} response data
 */
var successMessageFactory = function() {
    return messageFactory(true, 200, 0);
};

/**
 * Send data response when failure
 * @return {Object} response data
 */
var failureMessageFactory = function(errorCode) {
    return messageFactory(false, 400, errorCode);
};

/**
 * Send data response when get internal error
 * @return {Object} response data
 */
var internalErrorMessageFactory = function() {
    return messageFactory(false, 500, 1999);
};

/**
 * Send data response error when interact with DB
 * @return {Object} response data
 */
var databaseErrorMessageFactory = function() {
    return messageFactory(false, 504, 1999);
};

module.exports = {
    messageFactory: messageFactory,
    successMessageFactory: successMessageFactory,
    failureMessageFactory: failureMessageFactory,
    internalErrorMessageFactory: internalErrorMessageFactory,
    databaseErrorMessageFactory: databaseErrorMessageFactory
};
