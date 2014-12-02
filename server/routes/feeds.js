var express = require('express');
var router = express.Router();
var ff = require('../libs/feed_fetcher');
var Feed = require('../libs/models/feed');
var _ = require('lodash');
var Q = require('q');

router.post('/', function (req, res) {
    var feed_url = req.body.url;

    create_and_save_new_feed(feed_url)
        .then(function () {
            res.redirect('/');
        });
});

router.get('/:id', function (req, res) {
    get_simple_feed(req.params.id).then(function (feed) {
        if (req.headers['accept'].indexOf('application/json') !== -1) {
            res.json(feed);
        } else {
            res.render('index', {selected_feed: feed});
        }
    })
});

module.exports = router;


function create_and_save_new_feed(url) {
    var def = Q.defer();
    ff(url).then(function (obj) {
        var f = new Feed(obj);
        f.save(def.resolve);
    }, def.reject);

    return def.promise;
}

function get_simple_feed(id) {
    return Feed.find_by_id(id, {title: 1, author: 1, articles: 1});
}