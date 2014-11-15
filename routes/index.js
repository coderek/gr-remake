var express = require('express');
var router = express.Router();
var Feed = require('../libs/models/feed');
var User = require('../libs/models/user');
var passport = require('passport');

router.get('/', function(req, res) {
    if (req.user) {
        Feed.find(function (err, feeds) {
            res.render('index', {feeds: feeds, user: req.user, error: req.flash('error')});
        });
    } else {
        res.render('index', {error: req.flash('error')});
    }

});

router.get('/register', function (req, res) {
    res.render('register');
});

router.post('/register', function (req, res) {
    User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
        if (err) {
            return res.render('register', { info: err.message});
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


module.exports = router;
