var FeedParser = require('feedparser');
var Q = require('q')
var _ = require('lodash');
var jschardet = require('jschardet');
var Iconv = require('iconv').Iconv;
var request = require('request');
var wash = require('./washer').wash;

/**
 *
 * @param url
 * @return {Promise}
 */
function fetch_feed(url) {
    var bufs = [];

    var def = Q.defer();

    try {
        request(url)
            .on('data', _.partialRight(collectChunk, bufs))
            .on('end', function () {
                var full_buf = Buffer.concat(bufs);
                var result = jschardet.detect(full_buf);
                def.resolve(parse_feed(full_buf, result.encoding));
            });
    } catch (e) {
        console.log(e);
        def.reject(e);
    }

    return def.promise;
}

function collectChunk(buf, bufs) {
    bufs.push(buf);
}

function parse_feed(feedtext, encoding) {

    var i = new Iconv(encoding, 'UTF-8');
    var converted_feedtext;

    var def = Q.defer();
    var options = {addmeta: false};

    try {
        converted_feedtext = i.convert(feedtext);

        var feedparser = new FeedParser(options);

        var articles = [];
        var meta = null;

        feedparser.on('data', function (article) {
            article.summary = wash(article.summary);
            article.description = wash(article.description);
            articles.push(article);
        });

        feedparser.on('meta', function (_meta) {
            meta = _meta;
        });

        feedparser.on('error', function (err) {
            def.reject(err);
        });

        feedparser.on('end', function () {
            def.resolve(_.extend(meta, {
                articles: articles
            }));
        });

        feedparser.write(converted_feedtext);
        feedparser.end();

    } catch (e) {
        def.reject(e);
    }

    return def.promise;
}

module.exports = fetch_feed;