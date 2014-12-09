var db = require('./db');
var ff = require('./feed-fetcher');
var log = console.log.bind(console);
var mongoose = require('mongoose');

var item_schema = mongoose.Schema({
    title      : String,
    description: String,
    summary    : String,
    date       : {type: Date, default: Date.now},
    pubdate    : {type: Date, default: Date.now},
    link       : String,
    origlink   : String,
    author     : String,
    guid       : String,
    comments   : String,
    image      : {
        url: String
    },
    categories : [String],
    source     : {
        title: String,
        url  : String
    },
    enclosures : [
        {}
    ]
});

var feed_schema = mongoose.Schema({
    '#type'    : String,
    '#version' : String,
    title      : String,
    description: String,
    date       : {type: Date, default: Date.now},
    pubdate    : {type: Date, default: Date.now},
    link       : String,
    xmlurl     : String,
    author     : String,
    language   : String,
    image      : {
        url: String
    },
    favicon    : String,
    copyright  : String,
    generator  : String,
    categories : [String],
    articles: [item_schema]
});

var Feed = mongoose.model('Feed', feed_schema);

db.done(function () {
    log('db is connected');
    ff('http://codingnow.com/atom.xml').done(function (obj) {
        var f = new Feed(obj);
        f.save(function () {
            console.log('saved: ' + obj.title);
        });
    });
}, function (err) {
    log(err);
});