/**
 fetch all feeds from mongo and fetch them all
 */


var db = require('../libs/db');
var Feed = require('../libs/models/feed');
var mongoose = require('mongoose');
var _ = require('lodash');
var fetcher = require('../libs/feed-fetcher');
var Promise = require('bluebird');

db.then(fetchAllFeeds).then(update).done(function () {
    console.log('closing mongo connection');
    mongoose.connection.close();
});

function fetchAllFeeds() {
    return Feed.find({xmlurl: 'http://localhost:4567'}).exec().then(function (feeds) {
        return Promise.settle(_.map(feeds, function (feed) {
            var url = feed.xmlurl;

            if (!url)
                return [feed._id, null];

            return fetcher(url).then(function (fetched) {
                return [feed._id, fetched];
            });
        }));
    });
}

function update(pi) {
    return Promise.settle(_.map(pi, function (p) {

        if (p.isRejected()) {
            return Promise.resolve(p.reason());
        }

        var obj = p.value();

        var fid = obj[0];
        var feed = obj[1];

        if (!feed)
            return Promise.resolve(null);

        return Feed.findById(mongoose.Types.ObjectId(fid)).exec().then(function (f) {

            var existingArticles = _.pluck(f.articles, 'link');

            _.each(feed.articles, function (article) {
                if (!_.contains(existingArticles, article.link)) {
                    f.articles.push(article);
                }
            });

            f.date = feed.date;
            f.pubdate = feed.pubdate;
            f.categories = feed.categories;

            return new Promise(function (resolve) {
                f.save(resolve);
            });
        });
    }));
}