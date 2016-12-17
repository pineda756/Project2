var express = require('express');
var router = express.Router();
var instrument_dal = require('../model/instrument_dal');


// View All artists
router.get('/all', function(req, res) {
    instrument_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('instrument/instrumentViewAll', { 'result':result });
        }
    });

});

// View the artist for the given id
router.get('/', function(req, res){
    if(req.query.lesson_id == null) {
        res.send('lesson_id is null');
    }
    else {
        instrument_dal.getById(req.query.lesson_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('instrument/instrumentViewById', {'result': result});
            }
        });
    }
});


// Return the add a new artist form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    instrument_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('instrument/instrumentAdd', {'instrument': result});
        }
    });
});

// insert a artist record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.instrument == null) {
        res.send('Instrument must be provided.');
    }
    //else if(req.query.artist_id == null) {
    //    res.send('An Artist must be selected');
    //}
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        instrument_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/instrument/all');
            }
        });
    }
});

// Delete a school for the given school_id
router.get('/delete', function(req, res){
    if(req.query.lesson_id == null) {
        res.send('lesson_id is null');
    }
    else {
        instrument_dal.delete(req.query.lesson_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/instrument/all');
            }
        });
    }
});


module.exports = router;