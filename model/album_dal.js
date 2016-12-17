var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM album;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(album_number, callback) {
    var query = 'SELECT * FROM album WHERE album_number = ?';
    var queryData = [album_number];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};


exports.insert = function(params, callback) {
    var query = 'INSERT INTO album (title, genre, year_release, num_tracks, num_images) VALUES (?, ?, ?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.title, params.genre, params.year_release, params.num_tracks, params.num_images];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(album_number, callback) {
    var query = 'DELETE FROM album WHERE album_number = ?';
    var queryData = [album_number];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};