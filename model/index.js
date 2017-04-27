'use strict';

const Sequelize = require('sequelize');
const dbConfig = require('../config').db;
const fs = require('fs');
const mysql = require('mysql');
const Promise = require('bluebird');
const path = require('path');
var basename  = path.basename(module.filename);
var sequelize = new Sequelize(dbConfig.dbName, dbConfig.dbUser, dbConfig.dbSecret, {
	host: dbConfig.host,
	dialect: dbConfig.dialect,
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}, logging: false
});

var db = {};
//automatically init all models
(function() {
	fs.readdirSync(__dirname).filter(function(file) {
		return (file.indexOf('.') !== 0 && file !== 'index.js');
	}).forEach(function(file) {
		var model = sequelize['import'](path.join(__dirname, file));
		db[model.name] = model;
	})
})();

// authenticate
var authenticate = function() {
	return new Promise (function(resolve, reject) {
		sequelize.authenticate()
		.then(function () {
			console.log('Connection successful');
			resolve();
		})
		.catch(function(error) {
			console.log("Error creating connection:", error);
			reject();
		});
	});
}
// connect and sync to db
var connect = function() {
	return authenticate()
	.then(function() {
        return sequelize.sync();
	})
}
// export db
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.connect = connect;

module.exports = db;