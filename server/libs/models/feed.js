var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Q = require('q');
var _ = require('lodash');

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
    ],
    isread: false
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

var simple_fields = 'title id author pubdate';

feed_schema.statics.findUserFeeds = function (user){
    return this.find().select(simple_fields).exec();
};

feed_schema.statics.findEntries = function (id, options) {
    return this.findOne({_id: id}, {'articles' : 1}).exec().then(function (feed) {
        if (_.has(options, 'page') && _.has(options, 'perPage')) {
            var lastIndex = options.perPage * options.page;
            return feed.articles.slice(lastIndex - options.perPage, lastIndex);
        } else {
            return feed.articles;
        }
    });
};

feed_schema.statics.removeFeed = function (id) {
    return this.remove({_id: ObjectId(id)}).exec();
};

feed_schema.statics.updateEntry = function (fid, eid, entry) {
    var mEntry = {};

    _.each(entry, function (val, key) {
        mEntry['articles.$.' + key] = val;
    });

    return this.update({_id: ObjectId(fid),
        'articles._id': ObjectId(eid)}, mEntry, {upsert: true}).exec();
}

feed_schema.pre('save', function (next) {
//    isFeedExisted(this).then()
//    if (isFeedExisted(this)) {
//
//    }
    next();
});

var Feed = mongoose.model('Feed', feed_schema);

module.exports = Feed;