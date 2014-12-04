var express = require('express');
var router = express.Router();
var ff = require('../libs/feed_fetcher');
var Feed = require('../libs/models/feed');
var _ = require('lodash');
var Q = require('q');

router.post('/', function (req, res) {
    var feed_url = req.body.url;

    createAndSaveNewFeed(feed_url)
        .then(function (resp) {
            res.json(resp[0]);
        }, function () {
            res.status(400).json({message: 'Invalid url'});
        });
});


router.get('/:id/entries', function (req, res) {
    Feed.findEntries(req.params.id).then(function (entries) {
        res.json(entries)
    });
});


router.get('/:id', function (req, res) {
    getSimpleFeed(req.params.id).then(function (feed) {
        if (req.headers['accept'].indexOf('application/json') !== -1) {
            res.json(feed);
        } else {
            res.render('index', {selected_feed: feed});
        }
    })
});


module.exports = router;


function createAndSaveNewFeed(url) {
    return ff(url).then(function (obj) {
        var f = new Feed(obj);
        return Q.npost(f, 'save');
    });
}

function getSimpleFeed(id) {
    return Feed.findById(id, {title: 1, author: 1, articles: 1});
}