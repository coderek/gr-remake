var mongoose = require('mongoose');
var Q = require('q');

var article_schema = mongoose.Schema({
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
    articles: [article_schema]
});

var simple_fields = 'title id';

feed_schema.statics.findUserFeeds = function (user){
    return this.find().select(simple_fields).exec();
};

feed_schema.statics.findById = function (id, fields) {
    return this.findOne({_id: id}, fields || simple_fields).exec();
}

var Feed = mongoose.model('Feed', feed_schema);


module.exports = Feed;