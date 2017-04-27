/* (C)2017 NTT DOCOMO, INC. All Rights Reserved. */
'use strict';

/* Constant */
const constant = require('../constant');

/* User dto */
var User = (function() {
    /**
     * @summary User constructor
     */
    function User() {}

    /**
     * @summary Init user by user data entity
     * @param  {Object} userData user entity
     */
    User.prototype.init = function(userData) {
        if (!userData) {
            return;
        }

        this.setuserID(userData.id);
    };

    /**
     * @function
     * @summary Generate user information to send to client
     * @return {Object} return a dto object
     */
    User.prototype.toDTO = function() {
        return {
            user: this
        };
    };

    /**
     * @function
     * @summary Generate empty user information to send to client
     * @return {Object} return a dto object
     */
    User.prototype.toEmptyDTO = function() {
        return {
            user: {}
        };
    };

    return User;
})();


module.exports = {
};
