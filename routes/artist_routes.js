var express = require('express');
var router = express.Router();
var artist_dal = require('../model/artist_dal');


// View All artists
router.get('/all', function(req, res) {
    artist_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('artist/artistViewAll', { 'result':result });
        }
    });

});

// View the artist for the given id
router.get('/', function(req, res){
    if(req.query.artist_id == null) {
        res.send('artist_id is null');
    }
    else {
        artist_dal.getById(req.query.artist_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('artist/artistViewById', {'result': result});
            }
        });
    }
});


// Return the add a new artist form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    artist_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('artist/artistAdd', {'artist': result});
        }
    });
});

// insert a artist record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.stage_name == null) {
        res.send('Artist Name must be provided.');
    }
    //else if(req.query.artist_id == null) {
    //    res.send('An Artist must be selected');
    //}
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        artist_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/artist/all');
            }
        });
    }
});

// Delete a school for the given school_id
router.get('/delete', function(req, res){
    if(req.query.artist_id == null) {
        res.send('artist_id is null');
    }
    else {
        artist_dal.delete(req.query.artist_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/artist/all');
            }
        });
    }
});


module.exports = router;