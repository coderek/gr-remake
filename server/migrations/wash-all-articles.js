var _ = require('lodash');
var wash = require('../libs/washer').wash;
var Promise = require('bluebird');
var mongo = require('mongodb');
Promise.promisifyAll(mongo);

var MongoClient = mongo.MongoClient;
Promise.promisifyAll(MongoClient);

var url = 'mongodb://localhost:27017/gr';


MongoClient.connectAsync(url).then(function (db) {
    console.log("Connected correctly to server");

    updateArticles(db).then(function (results) {
        console.log(results);
    }).finally(function () {
        db.close();
    });
});

var feedsCol;

function updateArticles(db) {
    feedsCol = db.collection('feeds');
    return feedsCol.findAsync().then(processFeed);
}

function processFeed(cursor) {
    if (cursor === null) {
        return true;
    }

    return cursor.nextObjectAsync().then(function (feed) {
        var feedPromise = processArticles(feed);
        return Promise.settle([processFeed(cursor), feedPromise]);
    });
}

function processArticles(feed) {
    var articles = feed.articles;

    _.each(articles, function (article) {
        article.description = wash(article.description);
    });

    return feedsCol.updateAsync({xmlurl: feed.xmlurl}, feed);
}