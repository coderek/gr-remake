var express = require('express');
var router = express.Router();
var ff = require('../libs/feed-fetcher');
var Feed = require('../libs/models/feed');
var _ = require('lodash');
var Q = require('q');
var mongoose = require('mongoose');

router.post('/', function (req, res) {
    var feed_url = req.body.url;

    createAndSaveNewFeed(feed_url)
        .then(function (resp) {
            res.json(resp);
        }, function (err) {
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
        res.json(feed);
    });
});

router.delete('/:id', function (req, res) {
    deleteFeed(req.params.id).then(function () {
        res.status(200).json({});
    }, function (error) {
        res.status(400).json({message: error});
    });
});

router.patch('/:id/entries/:fid', function (req, res) {
    var obj = req.body;
    if (_.isObject(obj)) {
        Feed.updateEntry(req.params.id, req.params.fid, obj).then(function () {
            res.json(obj);
        });
    } else {
        res.status(400).json({message: 'Wrong arguments type.'});
    }
});


module.exports = router;


function createAndSaveNewFeed(url) {
    return ff(url).then(function (obj) {
        return Feed.create(obj);
    });
}

function getSimpleFeed(id) {
    return Feed.findById(id, {title: 1, author: 1, articles: 1});
}

function deleteFeed(id) {
    return Feed.removeFeed(id);
}