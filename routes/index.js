var express = require('express');
var router = express.Router();
var Feed = require('../libs/models/feed');

/* GET home page. */
router.get('/', function(req, res) {
    Feed.find(function (err, feeds) {
        console.log(feeds);
        res.render('index', { title: 'Express', feeds: feeds});
    });
});

module.exports = router;
