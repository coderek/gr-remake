var FeedParser = require('feedparser');
var Q = require('q')
var _ = require('lodash');
var jschardet = require('jschardet');
var Iconv = require('iconv').Iconv;
var request = require('request');

/**
 *
 * @param url
 * @return {Promise}
 */
function fetch_feed(url) {
    var encoding_tests = [];
    var bufs = [];

    var def = Q.defer();

    request(url)
        .on('data', _.partialRight(detectEncoding, encoding_tests, bufs))
        .on('end', function () {
            var encoding = _.max(_.reduce(encoding_tests, combine_encoding, []), 'confidence').encoding;
            def.resolve(parse_feed(Buffer.concat(bufs), encoding));
        });

    return def.promise;
}

function combine_encoding(results, test) {

    var enc = test.encoding;
    var idx;
    if ((idx = _.findIndex(results, function (a) {return a.encoding === enc;})) === -1) {
        results.push(test);
    } else {
        results[idx].confidence += test.confidence;
    }
    return results;
}

function detectEncoding(buf, tests, bufs) {
    var result = jschardet.detect(buf);
    tests.push(result);
    bufs.push(buf);
}

function parse_feed(feedtext, encoding) {
    var i = new Iconv(encoding, 'UTF-8');
    var converted_feedtext = i.convert(feedtext);

    var def = Q.defer();
    var options = {addmeta: false};

    var feedparser = new FeedParser(options);

    var articles = [];
    var meta = null;

    feedparser.on('data', function (article) {
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
    return def.promise;
}

module.exports = fetch_feed;