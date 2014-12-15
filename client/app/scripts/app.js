var FeedList = require('./views/feeds');
var EntriesView = require('./views/entries');
var Feeds = require('./models/feeds');
var feedForm = require('./views/feed-form'); // init only
var feedMetaView = require('./views/feed-meta');

require('./etc/hbs-helpers'); // init only
require('./etc/setup'); // init only
var feeds = new Feeds(fds, {parse: true});

var app = new Marionette.Application();

app.addRegions({
    feedsRegion: '#feed-list-region',
    entriesRegion: '#entries-region',
    feedMetaRegion: '#feed-meta-region'
});

app.addInitializer(function () {
    this.feedsRegion.show(new FeedList({collection: feeds}));
    this.feedMetaRegion.show(feedMetaView);
});

app.on('start', function () {
    require('./router');
    Backbone.history.start({pushState: true});
});

app.commands.setHandler('show-entries', function (feed, entries) {
    var view = new EntriesView({collection: entries});
    app.entriesRegion.show(view);
    feedMetaView.trigger('update', feed);
});

app.commands.setHandler('add-feed', function (rawFeed) {
    var feed = feeds.add(_.omit(rawFeed, 'articles'));
    feed.setEntries(rawFeed.articles);
    app.execute('show-entries', feed, feed.entries);
});

app.commands.setHandler('delete-feed', function (fid) {
    var feed = feeds.get(fid);
    if (feed) {
        return feed.destroy({success: function () {
            toastr.success('Deleted');
            feedMetaView.trigger('clear');
        }});
    }
});

app.commands.setHandler('show-feed', function (fid) {
    var feed = feeds.get(fid);
    if (feed) {
        app.execute('show-entries', feed, feed.entries);
    } else {
        toastr.warning('Feed is not found.');
    }
});

window.app = app;

module.exports = app;

$('.welcome').click(function () {
    $('.left-column').toggleClass('hide');
});

console.log(fds);