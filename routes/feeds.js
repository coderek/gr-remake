var express = require('express');
var router = express.Router();
var ff = require('../libs/feed_fetcher');
var Feed = require('../libs/models/feed');
var _ = require('lodash');

router.post('/', function(req, res) {
    var feed_url = req.body.url;
    ff(feed_url).then(function (obj) {
        var f = new Feed(obj);
        f.save(function () {
            res.redirect('/');
        });
    }, function () {
        console.log(arguments);
        res.redirect('/');
    });
});

module.exports = router;
