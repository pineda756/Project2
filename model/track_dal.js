var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM tracks;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(position, callback) {
    var query = 'SELECT * FROM tracks WHERE position = ?';
    var queryData = [position];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};


exports.insert = function(params, callback) {
    var query = 'INSERT INTO tracks (title, duration) VALUES (?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.title, params.duration];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(position, callback) {
    var query = 'DELETE FROM tracks WHERE position = ?';
    var queryData = [position];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};