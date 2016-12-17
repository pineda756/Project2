var express = require('express');
var router = express.Router();
var album_dal = require('../model/album_dal');


// View All album
router.get('/all', function(req, res) {
    album_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('album/albumViewAll', { 'result':result });
        }
    });

});

// View the album for the given id
router.get('/', function(req, res){
    if(req.query.album_number == null) {
        res.send('album_number is null');
    }
    else {
        album_dal.getById(req.query.album_number, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('album/albumViewById', {'result': result});
            }
        });
    }
});


// Return the add a new album form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    album_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('album/albumAdd', {'album': result});
        }
    });
});

// insert a album record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.title == null) {
        res.send('Album title must be provided.');
    }
    //else if(req.query.album_id == null) {
    //    res.send('An Album must be selected');
    //}
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        album_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/album/all');
            }
        });
    }
});

// Delete a school for the given school_id
router.get('/delete', function(req, res){
    if(req.query.album_number == null) {
        res.send('album_id is null');
    }
    else {
        album_dal.delete(req.query.album_number, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/album/all');
            }
        });
    }
});


module.exports = router;