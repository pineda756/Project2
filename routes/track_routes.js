var express = require('express');
var router = express.Router();
var track_dal = require('../model/track_dal');


// View All tracks
router.get('/all', function(req, res) {
    track_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('track/trackViewAll', { 'result':result });
        }
    });

});

// View the tracks for the given id
router.get('/', function(req, res){
    if(req.query.position == null) {
        res.send('position is null');
    }
    else {
        track_dal.getById(req.query.position, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('track/trackViewById', {'result': result});
            }
        });
    }
});


// Return the add a new track form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    track_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('track/trackAdd', {'track': result});
        }
    });
});

// insert a tracks record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.title == null) {
        res.send('Song title must be provided.');
    }
    //else if(req.query.position == null) {
    //    res.send('A Track must be selected');
    //}
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        track_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/track/all');
            }
        });
    }
});

// Delete a school for the given school_id
router.get('/delete', function(req, res){
    if(req.query.position == null) {
        res.send('position is null');
    }
    else {
        track_dal.delete(req.query.position, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/track/all');
            }
        });
    }
});


module.exports = router;