var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM artist;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(artist_id, callback) {
    var query = 'SELECT * FROM artist WHERE artist_id = ?';
    var queryData = [artist_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};


exports.insert = function(params, callback) {
    var query = 'INSERT INTO artist (stage_name, record_label, real_name, description) VALUES (?, ?, ? , ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.stage_name, params.record_label, params.real_name, params.description];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(artist_id, callback) {
    var query = 'DELETE FROM artist WHERE artist_id = ?';
    var queryData = [artist_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};