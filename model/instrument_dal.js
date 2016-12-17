var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM instruments;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(lesson_id, callback) {
    var query = 'SELECT * FROM instruments WHERE lesson_id = ?';
    var queryData = [lesson_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};


exports.insert = function(params, callback) {
    var query = 'INSERT INTO instruments (instrument, tabs, music_score) VALUES (?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.instrument, params.tabs, params.music_score];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(lesson_id, callback) {
    var query = 'DELETE FROM instruments WHERE lesson_id = ?';
    var queryData = [lesson_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};